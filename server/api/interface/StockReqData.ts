export class StockReqData {
    RSYM: string;
    SYMB: string;
    ZDIV: string;
    TYMD: string;
    XYMD: string;
    XHMS: string;
    KYMD: string;
    KHMS: string;
    OPEN: string;
    HIGH: string;
    LOW: string;
    LAST: string;
    SIGN: string;
    DIFF: string;
    RATE: string;
    PBID: string;
    PASK: string;
    VBID: string;
    VASK: string;
    EVOL: string;
    TVOL: string;
    TAMT: string;
    BIVL: string;
    ASVL: string;
    STRN: string;
    MTYP: string;

    constructor(reqString: string) {
        const reqStringStr = reqString.split("^");

        this.RSYM = reqStringStr[0];
        this.SYMB = reqStringStr[1];
        this.ZDIV = reqStringStr[2];
        this.TYMD = reqStringStr[3];
        this.XYMD = reqStringStr[4];
        this.XHMS = reqStringStr[5];
        this.KYMD = reqStringStr[6];
        this.KHMS = reqStringStr[7];
        this.OPEN = reqStringStr[8];
        this.HIGH = reqStringStr[9];
        this.LOW = reqStringStr[10];
        this.LAST = reqStringStr[11];
        this.SIGN = reqStringStr[12];
        this.DIFF = reqStringStr[13];
        this.RATE = reqStringStr[14];
        this.PBID = reqStringStr[15];
        this.PASK = reqStringStr[16];
        this.VBID = reqStringStr[17];
        this.VASK = reqStringStr[18];
        this.EVOL = reqStringStr[19];
        this.TVOL = reqStringStr[20];
        this.TAMT = reqStringStr[21];
        this.BIVL = reqStringStr[22];
        this.ASVL = reqStringStr[23];
        this.STRN = reqStringStr[24];
        this.MTYP = reqStringStr[25];
    }
}
