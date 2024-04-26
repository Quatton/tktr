
const tktrErrors = {
  INVALID_COMMAND: 400,
  INVALID_ITEM: 400,

  CREATE_CHECKOUT_SESSION_FAILED: 500,
  RETRIEVE_CHECKOUT_SESSION_FAILED: 500,
  NOT_IMPLEMENTED: 501,
} as const

type TKTRErrorType = keyof typeof tktrErrors

export class TKTRError extends Error {
  status: number

  constructor(code: TKTRErrorType) {
    
    super(code)
    this.status = tktrErrors[code]
  }

  toResponse() {
    return new Response(JSON.stringify(
      { message: this.message }
    ), { status: this.status })
  }
}