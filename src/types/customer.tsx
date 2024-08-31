export type CustomerProps = {
    name: string,
    phone_number: String,
    address: String,
    alternative_phone_number: String,
}

export type TopMeasurements = {
    customer: string; 
    shoulder_width: number;
    bust: number;
    waist: number;
    hip: number;
    armhole: number;
    sleeve_length: number;
    sleeve_circumference: number;
    top_length: number;
    neck_depth: number;
    neck_width: number;
    shoulder_to_bust: number;
}

export type BottomMeasurements = {
    customer: string; 
    waist: number;
    hip: number;
    length: number;
    thigh_circumference: number;
    knee_circumference: number;
    calf_circumference: number;
    ankle_circumference: number;
}
