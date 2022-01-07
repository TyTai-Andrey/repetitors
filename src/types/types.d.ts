type SelectDataReducerState = {
    subjects: ISubject[] | null;
    areas: IArea[] | null;
    districts: IDistricts[] | null;
    currentSubject: string | null;
}

type RepetitorsReducerState = {
    repetitorsID: number[];
    repetitors: IRepetitor[];
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
