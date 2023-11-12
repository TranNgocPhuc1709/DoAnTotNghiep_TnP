import Guid from "@library-src/utilities/types/Guid";
import IEmployee from "./IEmployee";
export default class Employee {
    constructor(employee?: IEmployee) {
        const me = this;
        if (employee) {
            me.CodeEmployee = employee.CodeEmployee;
            me.NameEmployee = employee.NameEmployee;
            me.GenderEmployee = employee.GenderEmployee;
            me.BirthEmployee = employee.BirthEmployee;
            me.TelephoneEmployee = employee.TelephoneEmployee;
            me.StatusEmployee = employee.StatusEmployee;
            me.PasswordEmployee = employee.PasswordEmployee;
            me.IdCardEmployee = employee.IdCardEmployee;
            me.DateCardEmployee = employee.DateCardEmployee;
            me.AddressCardEmployee = employee.AddressCardEmployee;
            me.MaritalEmployee = employee.MaritalEmployee;
            me.ConfirmPasswordEmployee = employee.ConfirmPasswordEmployee;
            me.UsageSystem = employee.UsageSystem;
            me.HomePhone = employee.HomePhone;
            me.AddressHome = employee.AddressHome;
            me.NationEmployee = employee.NationEmployee;
            me.DistrictEmployee = employee.DistrictEmployee;
            me.ProvinceEmployee = employee.ProvinceEmployee;
            me.WardsEmployee = employee.WardsEmployee;
            me.AddressPresent = employee.AddressPresent;
            me.NationPresent = employee.NationPresent;
            me.DistrictPresent = employee.DistrictPresent;
            me.ProvincePresent = employee.ProvincePresent;
            me.WardsPresent = employee.WardsPresent;


            me.EmergencyEmployee = employee.EmergencyEmployee;
            me.RelationshipEmployee = employee.RelationshipEmployee;
            me.PhoneEmergency = employee.PhoneEmergency;
            me.LandlinePhone = employee.LandlinePhone;
            me.EmailHome = employee.EmailHome;
            me.AddressEmergency = employee.AddressEmergency;

        }
        me.EmployeeId = Guid.NewGuid();
    }
    CodeEmployee?: string;
    NameEmployee?: string;
    GenderEmployee?: string;
    BirthEmployee?: Date;
    TelephoneEmployee?: number;
    StatusEmployee?: string;
    PasswordEmployee?: string;
    IdCardEmployee?: number;
    DateCardEmployee?: Date;
    AddressCardEmployee?: string;
    MaritalEmployee?: string;
    ConfirmPasswordEmployee?: string;
    UsageSystem?: string;
    HomePhone?: number
    AddressHome?: string;
    NationEmployee?: string;
    DistrictEmployee?: string;
    ProvinceEmployee?: string;
    WardsEmployee?: string;
    AddressPresent?: string;
    NationPresent?: string;
    DistrictPresent?: string;
    ProvincePresent?: string;
    WardsPresent?: string;

    EmergencyEmployee?: string;
    RelationshipEmployee?: string;
    PhoneEmergency?: number;
    LandlinePhone?: number;
    EmailHome?: string;
    AddressEmergency?: string;


    EmployeeId?: string;

} 