export const shipmentStatusMap = (status: Number) => {

    switch (status) {

        case 1:
            return "confirmed";

        case 2:
            return "packed";

        case 3:
            return "inTransit";

        case 4:
            return "delivered";

        case 5:
            return "failed";

        default:
            return "pending";

    }

}

export const shipmentStatusToInt = (status: string) => {

    switch (status) {

        case "confirmed":
            return 1;

        case "packed":
            return 2;

        case "inTransit":
            return 3;

        case "delivered":
            return 4;

        case "failed":
            return 5

        default:
            return 0;

    }

}

export const ontarioTowns = [
    "Ajax",
    "Halton",
    "Peterborough",
    "Atikokan",
    "Halton Hills",
    "Pickering",
    "Barrie",
    "Hamilton",
    "Port Bruce",
    "Belleville",
    "Hamilton-Wentworth",
    "Port Burwell",
    "Blandford-Blenheim",
    "Hearst",
    "Port Colborne",
    "Blind River",
    "Huntsville",
    "Port Hope",
    "Brampton",
    "Ingersoll",
    "Prince Edward",
    "Brant",
    "James",
    "Quinte West",
    "Brantford",
    "Kanata",
    "Renfrew",
    "Brock",
    "Kincardine",
    "Richmond Hill",
    "Brockville",
    "King",
    "Sarnia",
    "Burlington",
    "Kingston",
    "Sault Ste. Marie",
    "Caledon",
    "Kirkland Lake",
    "Scarborough",
    "Cambridge",
    "Kitchener",
    "Scugog",
    "Chatham-Kent",
    "Larder Lake",
    "Souix Lookout CoC Sioux Lookout",
    "Chesterville",
    "Leamington",
    "Smiths Falls",
    "Clarington",
    "Lennox-Addington",
    "South-West Oxford",
    "Cobourg",
    "Lincoln",
    "St. Catharines",
    "Cochrane",
    "Lindsay",
    "St. Thomas",
    "Collingwood",
    "London",
    "Stoney Creek",
    "Cornwall",
    "Loyalist Township",
    "Stratford",
    "Cumberland",
    "Markham",
    "Sudbury",
    "Deep River",
    "Metro Toronto",
    "Temagami",
    "Dundas",
    "Merrickville",
    "Thorold",
    "Durham",
    "Milton",
    "Thunder Bay",
    "Dymond",
    "Nepean",
    "Tillsonburg",
    "Ear Falls",
    "Newmarket",
    "Timmins",
    "East Gwillimbury",
    "Niagara",
    "Toronto",
    "East Zorra-Tavistock",
    "Niagara Falls",
    "Uxbridge",
    "Elgin",
    "Niagara-on-the-Lake",
    "Vaughan",
    "Elliot Lake",
    "North Bay",
    "Wainfleet",
    "Flamborough",
    "North Dorchester",
    "Wasaga Beach",
    "Fort Erie",
    "North Dumfries",
    "Waterloo",
    "Fort Frances",
    "North York",
    "Waterloo",
    "Gananoque",
    "Norwich",
    "Welland",
    "Georgina",
    "Oakville",
    "Wellesley",
    "Glanbrook",
    "Orangeville",
    "West Carleton",
    "Gloucester",
    "Orillia",
    "West Lincoln",
    "Goulbourn",
    "Osgoode",
    "Whitby",
    "Gravenhurst",
    "Oshawa",
    "Wilmot",
    "Grimsby",
    "Ottawa",
    "Windsor",
    "Guelph",
    "Ottawa-Carleton",
    "Woolwich",
    "Haldimand-Norfork",
    "Owen Sound",
    "York"
];
