export interface Sms {
              // Primary Key
    username: string;         // Unique Username
    action: string;           // Action stored as a string
    data: object;             // Data stored as a generic object
    createdAt: Date;          // Creation Timestamp
    updatedAt: Date;          // Update Timestamp
  }