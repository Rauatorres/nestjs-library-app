export interface User {
    name: string;
    password: string;
    books: {
        title: string,
        categories: { name: string }[],
    };
}
