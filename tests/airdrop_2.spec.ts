import * as anchor from '@project-serum/anchor'
import { Token, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token'
import { Account } from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'
import assert from 'assert'
import Provider from './provider'
import { ACCOUNTS } from './accounts'
import { createToken, predefinedAccount, assertThrowsAsync } from './utils'
export const SEED = Buffer.from('NB:Airdrop')

describe('airdrop', () => {
  const provider = Provider.local()
  console.log(provider)
  anchor.setProvider(provider);

  const programTokenAccount_sketch = new PublicKey("8URgTfDG9wcFZc1xA8Z2keKsP9fn1dtLKDY1X4fVAzFb")
  const programTokenAccount_token= new PublicKey("31ba5vpgmKQGcndJADhUEhG7ojAGMtQ9ZDHe8BbLStR1")
  const authority= new PublicKey("cxxwiLWRvftZNwAEyMUGqanpJapi3N4G8Lu32RpkHGR")



  //const provider = anchor.Provider.local()
  const program = anchor.workspace.Airdrop as anchor.Program
  const connection = program.provider.connection
  // @ts-expect-error
  const wallet: Account = provider.wallet.payer as Account
  let blue: Token
  let nonce: number
  //let authority: PublicKey
  let programTokenAccount: PublicKey
  let token: Token
  const amountPerUser = new anchor.BN(100)
  const totalAmount = new u64(1000)
  before(async () => {
    //const [_authority, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
      //[SEED],
      ///program.programId
    //)
  //  nonce = _nonce
    //authority = _authority
    //console.log(authority.toBase58())
    // @ts-expect-error
    //await program.state.rpc.new(nonce, amountPerUser, {
      //accounts: {
        //authority: authority
      //}
    //})
    token = await createToken({
      connection,
      payer: wallet,
      mintAuthority: wallet.publicKey,
      decimals: 6
    })
    let blue=token
    blue.publicKey=programTokenAccount_token
    //programTokenAccount = await blue.createAccount(authority)
    //token.mintTo(programTokenAccount, wallet, [], totalAmount)
  })

  describe('#claim', () => {
    it('Claim with eligible account', async () => {
      console.log('claim with test')
    })
  })
})
