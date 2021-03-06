
export class SubscribersListModel {
    Count: number;
    Data:  Datum[];
}

export class Datum {
    SystemId:                     null;
    Area:                         string;
    PublicId:                     number;
    CountryCode:                  string;
    CountryName:                  string;
    Name:                         string;
    Email:                        string;
    JobTitle:                     string;
    PhoneNumber:                  string;
    PhoneCode:                    string;
    PhoneCodeAndNumber:           string;
    LastActivityUtc:              Date | null;
    LastActivity:                 Date | null;
    SubscriptionDate:             null | string;
    SubscriptionMethod:           number;
    SubscriptionState:            number;
    SubscriptionStateDescription: string;
    Topics:                       any[];
    Activity:                     string;
    ConnectionState:              number;
    Id:                           number;
}
