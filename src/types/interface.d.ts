interface ISubjects {
    namePrep: string;
    nameGen: string;
    name: string;
    id: number;
}

interface IArea {
    timeZone: number;
    namePrep: string;
    nameGen: string;
    regionName: string;
    cityName: string;
    name: string;
    id: number;
}

interface IDistricts {
    metroLine: string | null;
    time: number;
    areaId: number;
    verbatimName: string;
    type: number;
    nameWithPrep: string;
    nameLocative: string;
    metroLineColor: string;
    name: string;
    id: number;
}
