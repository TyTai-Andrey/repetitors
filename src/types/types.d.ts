type SelectDataReducerState = {
    subjects: ISubjects[] | null;
    areas: IArea[] | null;
    districts: IDistricts[] | null;
}

type RepetitorsReducerState = {
    repetitorsID: any[];
    repetitors: any[];
}

type DataForRequestReducerState = {
    subject: string | null;
    area: string | null;
    district: string | null;
}

type AppState = {
    selectDataReducer: SelectDataReducerState,
    repetitorsReducer: RepetitorsReducerState,
    dataForRequestReducer: DataForRequestReducerState,
}
