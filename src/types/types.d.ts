type SelectDataReducerState = {
    subjects: string;
    areas: string;
    districts: string;
}

type RepetitorsReducerState = {
    repetitorsID: any[];
    repetitors: any[];
}


type DataForRequestReducerState = {
    subject: string,
    area: string,
    district: string,
    asd: boolean
}

type AppState = {
    selectDataReducer: SelectDataReducerState,
    repetitorsReducer: RepetitorsReducerState,
    dataForRequestReducer: DataForRequestReducerState,

    // data: SelectDataReducerState,
    // presetData: DataForRequestReducerState,
    // download: RepetitorsReducerState,
}
