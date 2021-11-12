import { Keypair } from '@solana/web3.js'
import * as fs from 'fs/promises'
const main = async () => {
  // const acc = Keypair.generate().publicKey
  // console.log(acc.toString())
  const accs = []
  for (let index = 0; index < 100; index++) {
    accs.push(Keypair.generate().publicKey.toString())
  }
  await fs.writeFile('./script/myjsonfile.json', JSON.stringify(accs), 'utf8')
}
main()
