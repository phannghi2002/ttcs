export const convertCompany = (company) => {
    const COMPANY = [
        { name: 'VIETNAM AIRLINES' },
        { name: 'BAMBO AIRWAYS' },
        { name: 'VIETJET AIR' },
        { name: 'JETSTAR PACIFIC AIRLINES' },
    ];
    if (company.includes('VNA')) return COMPANY[0].name;
    else if (company.includes('QH')) return COMPANY[1].name;
    else if (company.includes('VJ')) return COMPANY[2].name;
    else return COMPANY[3].name;
};
