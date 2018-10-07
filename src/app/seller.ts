export interface Seller {
    _id: string;
    userID: string;
    password: string;
    sellerNo: number,
    name: string;
    storeName: string;
    phone: string;
    email: string;
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}