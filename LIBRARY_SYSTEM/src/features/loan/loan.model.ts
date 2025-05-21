export class Loan {
  constructor(
    public id: number,
    public bookId: number,
    public memberId: number,
    public loanDate: Date,
    public returnDate: Date | null
  ) {}
}
