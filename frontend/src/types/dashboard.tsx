export type Statistics = {

    "goals": {
        "id": string,
        "userId": string,
        "title": string,
        "description": string,
        "category": Category,
        "targetAmount": number,
        "savedAmount": number,
        "deadline": Date,
        "isLocked": boolean,
        "status": Status,
        "createdAt": Date,
        "updatedAt": Date
      }[],

    "wallets": {
      "id": string,
      "userId": string,
      "main": number,
      "sub": number,
      "createdAt": Date,
      "updatedAt": Date
    },

    "activeGoals": number,

    "totalSaved": number
  }

export type StatisticsResponse = {

  "success": boolean,

  "data": Statistics | null,

  "message": string
}


export type Category = "Travel" | "Rent"

export type Status = "active" | "pending" | "cancelled"
