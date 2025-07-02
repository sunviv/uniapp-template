/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
// 包路径
const package_NdefRecord = 'android.nfc.NdefRecord'
const package_NdefMessage = 'android.nfc.NdefMessage'
const package_TECH_DISCOVERED = 'android.nfc.action.TECH_DISCOVERED'
const package_Intent = 'android.content.Intent'
const package_Activity = 'android.app.Activity'
const package_PendingIntent = 'android.app.PendingIntent'
const package_IntentFilter = 'android.content.IntentFilter'
const package_NfcAdapter = 'android.nfc.NfcAdapter'
const package_Ndef = 'android.nfc.tech.Ndef'
const package_NdefFormatable = 'android.nfc.tech.NdefFormatable'
const package_Parcelable = 'android.os.Parcelable'
const package_String = 'java.lang.String'

let NfcAdapter
let NdefRecord
let NdefMessage
let readyWriteData = false
let readyRead = false
let noNFC = false
const techListsArray = [
  ['android.nfc.tech.IsoDep'],
  ['android.nfc.tech.NfcA'],
  ['android.nfc.tech.NfcB'],
  ['android.nfc.tech.NfcF'],
  ['android.nfc.tech.Nfcf'],
  ['android.nfc.tech.NfcV'],
  ['android.nfc.tech.NdefFormatable'],
  ['android.nfc.tech.MifareClassi'],
  ['android.nfc.tech.MifareUltralight'],
]
// 要写入的数据
const text = '{id:123,name:nfc,stie:cssmini.com}'
let readResult = ''

export default {
  listenNFCStatus() {
    const that = this
    try {
      const main = plus.android.runtimeMainActivity()
      const Intent = plus.android.importClass('android.content.Intent')
      const Activity = plus.android.importClass('android.app.Activity')
      const PendingIntent = plus.android.importClass('android.app.PendingIntent')
      const IntentFilter = plus.android.importClass('android.content.IntentFilter')
      NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter')
      const nfcAdapter = NfcAdapter.getDefaultAdapter(main)

      if (nfcAdapter == null) {
        uni.showToast({
          title: '设备不支持NFC！',
          icon: 'none',
        })
        noNFC = true
        return
      }

      if (!nfcAdapter.isEnabled()) {
        uni.showToast({
          title: '请在系统设置中先启用NFC功能！',
          icon: 'none',
        })
        noNFC = true
        return
      }
      else {
        noNFC = false
      }

      const intent = new Intent(main, main.getClass())
      intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
      const pendingIntent = PendingIntent.getActivity(main, 0, intent, 0)
      const ndef = new IntentFilter('android.nfc.action.TECH_DISCOVERED')
      ndef.addDataType('*/*')
      const intentFiltersArray = [ndef]

      plus.globalEvent.addEventListener('newintent', () => {
        console.log('newintent running')
        // 轮询调用 NFC
        setTimeout(that.nfcRuning(), 1000)
      })
      plus.globalEvent.addEventListener('pause', (e) => {
        console.log('pause running')
        if (nfcAdapter) {
          // 关闭前台调度系统
          // 恢复默认状态
          nfcAdapter.disableForegroundDispatch(main)
        }
      })
      plus.globalEvent.addEventListener('resume', (e) => {
        console.log('resume running')
        if (nfcAdapter) {
          // 开启前台调度系统
          // 优于所有其他NFC
          nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray)
        }
      })
      nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray)
    }
    catch (e) {
      console.error(e)
    }
  },
  nfcRuning() {
    NdefRecord = plus.android.importClass('android.nfc.NdefRecord')
    NdefMessage = plus.android.importClass('android.nfc.NdefMessage')
    const main = plus.android.runtimeMainActivity()
    const intent = main.getIntent()
    const that = this

    console.log(`action type:${intent.getAction()}`)

    if (package_TECH_DISCOVERED === intent.getAction()) {
      if (readyWriteData) {
        that.write(intent)
        readyWriteData = false
      }
      else if (readyRead) {
        that.read(intent)
        readyRead = false
      }
    }
  },
  write(intent) {
    try {
      toast('请勿移开标签 正在写入...')
      console.log(`text=${text}`)

      const textBytes = plus.android.invoke(text, 'getBytes')
      // image/jpeg text/plain
      const textRecord = new NdefRecord(NdefRecord.TNF_MIME_MEDIA, plus.android.invoke('text/plain', 'getBytes'), plus.android.invoke('', 'getBytes'), textBytes)
      const message = new NdefMessage([textRecord])
      const Ndef = plus.android.importClass('android.nfc.tech.Ndef')
      const NdefFormatable = plus.android.importClass('android.nfc.tech.NdefFormatable')
      const tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG)
      const ndef = Ndef.get(tag)
      if (ndef != null) {
        // 待写入的数据长度
        const size = message.toByteArray().length
        ndef.connect()
        if (!ndef.isWritable()) {
          toast('tag不允许写入！')
          return
        }
        if (ndef.getMaxSize() < size) {
          toast('文件大小超出容量！')
          return
        }
        ndef.writeNdefMessage(message)
        toast('写入数据成功！')
      }
      else {
        const format = NdefFormatable.get(tag)
        if (format != null) {
          try {
            format.connect()
            format.format(message)
            toast('格式化tag并且写入message')
          }
          catch (e) {
            toast('格式化tag失败.')
          }
        }
        else {
          toast('Tag不支持NDEF')
        }
      }
    }
    catch (e) {
      toast('写入失败')
      console.log(`error=${e}`)
    }
  },
  read(intent) {
    toast('请勿移开标签正在读取数据')
    const that = this
    // NFC id
    const bytesId = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID)
    const nfc_id = that.byteArrayToHexString(bytesId)
    console.log('nfc_id:', nfc_id)
    const Parcelable = plus.android.importClass('android.os.Parcelable')
    const rawmsgs = intent.getParcelableArrayExtra('android.nfc.extra.NDEF_MESSAGES')
    // let rawmsgs = intent.getParcelableArrayExtra();

    if (rawmsgs != null && rawmsgs.length > 0) {
      const records = rawmsgs[0].getRecords()
      const result = records[0].getPayload()
      const data = plus.android.newObject('java.lang.String', result)
      toast(`NFC 数据：${data}`)
      console.log('NFC 数据：', data)
      readResult = data
    }
    else {
      toast('没有读取到数据')
    }
  },
  byteArrayToHexString(inarray) { // converts byte arrays to string
    let i, j, inn
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let out = ''

    for (j = 0; j < inarray.length; ++j) {
      inn = inarray[j] & 0xFF
      i = (inn >>> 4) & 0x0F
      out += hex[i]
      i = inn & 0x0F
      out += hex[i]
    }
    return out
  },
  writeData() {
    if (noNFC) {
      toast('请检查设备是否支持并开启 NFC 功能！')
      return
    }
    // 轮询条件
    readyWriteData = true
    toast('请将NFC标签靠近！')
  },
  readData() {
    if (noNFC) {
      toast('请检查设备是否支持并开启 NFC 功能！')
      return
    }
    // 轮询条件
    readyRead = true
    toast('请将NFC标签靠近！')
  },
}
function toast(content) {
  uni.showToast({
    title: content,
    icon: 'none',
  })
}
