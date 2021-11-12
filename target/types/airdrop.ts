export type Airdrop = {
  "version": "0.0.0",
  "name": "airdrop",
  "instructions": [],
  "state": {
    "struct": {
      "name": "InternalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "claims",
            "type": {
              "array": [
                "bool",
                2
              ]
            }
          }
        ]
      }
    },
    "methods": [
      {
        "name": "new",
        "accounts": [
          {
            "name": "authority",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "claim",
        "accounts": [
          {
            "name": "authority",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "programAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "to",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          }
        ],
        "args": [
          {
            "name": "index",
            "type": "u16"
          }
        ]
      }
    ]
  },
  "errors": [
    {
      "code": 300,
      "name": "Unauthorized",
      "msg": "You are not eligible to recive Airdrop"
    },
    {
      "code": 301,
      "name": "AlreadyClaimed",
      "msg": "Already claimed Airdrop"
    }
  ]
};

export const IDL: Airdrop = {
  "version": "0.0.0",
  "name": "airdrop",
  "instructions": [],
  "state": {
    "struct": {
      "name": "InternalState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "claims",
            "type": {
              "array": [
                "bool",
                2
              ]
            }
          }
        ]
      }
    },
    "methods": [
      {
        "name": "new",
        "accounts": [
          {
            "name": "authority",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "nonce",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "claim",
        "accounts": [
          {
            "name": "authority",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "programAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "to",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "signer",
            "isMut": false,
            "isSigner": true
          }
        ],
        "args": [
          {
            "name": "index",
            "type": "u16"
          }
        ]
      }
    ]
  },
  "errors": [
    {
      "code": 300,
      "name": "Unauthorized",
      "msg": "You are not eligible to recive Airdrop"
    },
    {
      "code": 301,
      "name": "AlreadyClaimed",
      "msg": "Already claimed Airdrop"
    }
  ]
};
