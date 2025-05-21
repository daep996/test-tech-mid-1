export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public isbn: string,
    public publishedDate: Date,
    public libraryId: number | null
  ) {}
}
