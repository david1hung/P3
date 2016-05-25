var occupationModel = require('../models/occupation');
var format = require('../util/format');

module.exports.handleVideoPage = function(req, res) {
    occupationModel.find(req.params.occupation,
     function (occupation) {
         var templateData = new Object();
         setupIconTemplateData(templateData, occupation);

         templateData.occupationTitle = occupation.title;

         if (req.user) {
            templateData.loggedIn = true;
        } else {
            templateData.loggedIn = false;
        }

        res.render('video.html', templateData);
    },
    function (err) {
     res.writeHead(500);
     res.end('Server error');
 });
}

module.exports.handleCareerOutlookPage = function(req, res) {
    occupationModel.find(req.params.occupation,
     function (occupation) {
         var templateData = new Object();
         setupIconTemplateData(templateData, occupation);

         templateData.occupationTitle = occupation.title;

         var currentEmployment = parseFloat(occupation.currentEmployment) * 1000;
         templateData.currentEmployment = format.formatWithThousandSeparators(currentEmployment);

         var futureEmployment = parseFloat(occupation.futureEmployment) * 1000;
         templateData.futureEmployment = format.formatWithThousandSeparators(futureEmployment);

         var jobOpenings = parseFloat(occupation.jobOpenings) * 1000;
         templateData.jobOpenings = format.formatWithThousandSeparators(jobOpenings);

         if (req.user) {
            templateData.loggedIn = true;
        } else {
            templateData.loggedIn = false;
        }

        res.render('careerOutlook.html', templateData);
    },
    function (err) {
     res.writeHead(500);
     res.end('Server error');
 });
};

module.exports.handleSalaryPage = function(req, res) {
    occupationModel.find(req.params.occupation,
     function (occupation) {
         occupationModel.getStateData(req.params.occupation,
            function (stateOccupationData) {

             var templateData = new Object();
             setupIconTemplateData(templateData, occupation);

             templateData.occupationTitle = occupation.title;

             templateData.NATAvg = occupation.averageWage;

        // TECH DEBT: Not sure the if statements are explicitly necessary
        if (templateData.lowWageOutOfRange == 1) {
            templateData.NATLo = 187200;
        }
        else {
            templateData.NATLo = occupation.lowWage;
        }

        if (templateData.medianWageOutOfRange == 1) {
            templateData.NATMed = 187200;
        }
        else {
            templateData.NATMed = occupation.medianWage;
        }

        if (templateData.highWageOutOfRange == 1) {
            templateData.NATHi = 187200;
        } 
        else {
            templateData.NATHi = occupation.highWage;
        }

            // State specific code
            for (i = 0; i < stateOccupationData.length; i++) {
                switch(stateOccupationData[i].stateCode) {
                    case "AL":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AL = false;
                    } else {
                        templateData.AL = true;
                        templateData.ALAvg = stateOccupationData[i].averageWage;
                        templateData.ALLo = stateOccupationData[i].lowWage;
                        templateData.ALMed = stateOccupationData[i].medianWage;
                        templateData.ALHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "AK":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AK = false;
                    } else {
                        templateData.AK = true;
                        templateData.AKAvg = stateOccupationData[i].averageWage;
                        templateData.AKLo = stateOccupationData[i].lowWage;
                        templateData.AKMed = stateOccupationData[i].medianWage;
                        templateData.AKHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "AZ":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AZ = false;
                    } else {
                        templateData.AZ = true;
                        templateData.AZAvg = stateOccupationData[i].averageWage;
                        templateData.AZLo = stateOccupationData[i].lowWage;
                        templateData.AZMed = stateOccupationData[i].medianWage;
                        templateData.AZHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "AR":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AR = false;
                    } else {
                        templateData.AR = true;
                        templateData.ARAvg = stateOccupationData[i].averageWage;
                        templateData.ARLo = stateOccupationData[i].lowWage;
                        templateData.ARMed = stateOccupationData[i].medianWage;
                        templateData.ARHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "CA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.CA = false;
                    } else {
                        templateData.CA = true;
                        templateData.CAAvg = stateOccupationData[i].averageWage;
                        templateData.CALo = stateOccupationData[i].lowWage;
                        templateData.CAMed = stateOccupationData[i].medianWage;
                        templateData.CAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "CO":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.CO = false;
                    } else {
                        templateData.CO = true;
                        templateData.COAvg = stateOccupationData[i].averageWage;
                        templateData.COLo = stateOccupationData[i].lowWage;
                        templateData.COMed = stateOccupationData[i].medianWage;
                        templateData.COHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "CT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.CT = false;
                    } else {
                        templateData.CT = true;
                        templateData.CTAvg = stateOccupationData[i].averageWage;
                        templateData.CTLo = stateOccupationData[i].lowWage;
                        templateData.CTMed = stateOccupationData[i].medianWage;
                        templateData.CTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "DE":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.DE = false;
                    } else {
                        templateData.DE = true;
                        templateData.DEAvg = stateOccupationData[i].averageWage;
                        templateData.DELo = stateOccupationData[i].lowWage;
                        templateData.DEMed = stateOccupationData[i].medianWage;
                        templateData.DEHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "DC":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.DC = false;
                    } else {
                        templateData.DC = true;
                        templateData.DCAvg = stateOccupationData[i].averageWage;
                        templateData.DCLo = stateOccupationData[i].lowWage;
                        templateData.DCMed = stateOccupationData[i].medianWage;
                        templateData.DCHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "FL":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.FL = false;
                    } else {
                        templateData.FL = true;
                        templateData.FLAvg = stateOccupationData[i].averageWage;
                        templateData.FLLo = stateOccupationData[i].lowWage;
                        templateData.FLMed = stateOccupationData[i].medianWage;
                        templateData.FLHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "GA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.GA = false;
                    } else {
                        templateData.GA = true;
                        templateData.GAAvg = stateOccupationData[i].averageWage;
                        templateData.GALo = stateOccupationData[i].lowWage;
                        templateData.GAMed = stateOccupationData[i].medianWage;
                        templateData.GAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "HI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.HI = false;
                    } else {
                        templateData.HI = true;
                        templateData.HIAvg = stateOccupationData[i].averageWage;
                        templateData.HILo = stateOccupationData[i].lowWage;
                        templateData.HIMed = stateOccupationData[i].medianWage;
                        templateData.HIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "ID":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.ID = false;
                    } else {
                        templateData.ID = true;
                        templateData.IDAvg = stateOccupationData[i].averageWage;
                        templateData.IDLo = stateOccupationData[i].lowWage;
                        templateData.IDMed = stateOccupationData[i].medianWage;
                        templateData.IDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "IL":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.IL = false;
                    } else {
                        templateData.IL = true;
                        templateData.ILAvg = stateOccupationData[i].averageWage;
                        templateData.ILLo = stateOccupationData[i].lowWage;
                        templateData.ILMed = stateOccupationData[i].medianWage;
                        templateData.ILHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "IN":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.IN = false;
                    } else {
                        templateData.IN = true;
                        templateData.INAvg = stateOccupationData[i].averageWage;
                        templateData.INLo = stateOccupationData[i].lowWage;
                        templateData.INMed = stateOccupationData[i].medianWage;
                        templateData.INHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "IA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.IA = false;
                    } else {
                        templateData.IA = true;
                        templateData.IAAvg = stateOccupationData[i].averageWage;
                        templateData.IALo = stateOccupationData[i].lowWage;
                        templateData.IAMed = stateOccupationData[i].medianWage;
                        templateData.IAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "KS":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.KS = false;
                    } else {
                        templateData.KS = true;
                        templateData.KSAvg = stateOccupationData[i].averageWage;
                        templateData.KSLo = stateOccupationData[i].lowWage;
                        templateData.KSMed = stateOccupationData[i].medianWage;
                        templateData.KSHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "KY":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.KY = false;
                    } else {
                        templateData.KY = true;
                        templateData.KYAvg = stateOccupationData[i].averageWage;
                        templateData.KYLo = stateOccupationData[i].lowWage;
                        templateData.KYMed = stateOccupationData[i].medianWage;
                        templateData.KYHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "LA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.LA = false;
                    } else {
                        templateData.LA = true;
                        templateData.LAAvg = stateOccupationData[i].averageWage;
                        templateData.LALo = stateOccupationData[i].lowWage;
                        templateData.LAMed = stateOccupationData[i].medianWage;
                        templateData.LAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "ME":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.ME = false;
                    } else {
                        templateData.ME = true;
                        templateData.MEAvg = stateOccupationData[i].averageWage;
                        templateData.MELo = stateOccupationData[i].lowWage;
                        templateData.MEMed = stateOccupationData[i].medianWage;
                        templateData.MEHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MD":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MD = false;
                    } else {
                        templateData.MD = true;
                        templateData.MDAvg = stateOccupationData[i].averageWage;
                        templateData.MDLo = stateOccupationData[i].lowWage;
                        templateData.MDMed = stateOccupationData[i].medianWage;
                        templateData.MDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MA = false;
                    } else {
                        templateData.MA = true;
                        templateData.MAAvg = stateOccupationData[i].averageWage;
                        templateData.MALo = stateOccupationData[i].lowWage;
                        templateData.MAMed = stateOccupationData[i].medianWage;
                        templateData.MAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MI = false;
                    } else {
                        templateData.MI = true;
                        templateData.MIAvg = stateOccupationData[i].averageWage;
                        templateData.MILo = stateOccupationData[i].lowWage;
                        templateData.MIMed = stateOccupationData[i].medianWage;
                        templateData.MIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MN":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MN = false;
                    } else {
                        templateData.MN = true;
                        templateData.MNAvg = stateOccupationData[i].averageWage;
                        templateData.MNLo = stateOccupationData[i].lowWage;
                        templateData.MNMed = stateOccupationData[i].medianWage;
                        templateData.MNHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MS":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MS = false;
                    } else {
                        templateData.MS = true;
                        templateData.MSAvg = stateOccupationData[i].averageWage;
                        templateData.MSLo = stateOccupationData[i].lowWage;
                        templateData.MSMed = stateOccupationData[i].medianWage;
                        templateData.MSHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MO":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MO = false;
                    } else {
                        templateData.MO = true;
                        templateData.MOAvg = stateOccupationData[i].averageWage;
                        templateData.MOLo = stateOccupationData[i].lowWage;
                        templateData.MOMed = stateOccupationData[i].medianWage;
                        templateData.MOHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MT = false;
                    } else {
                        templateData.MT = true;
                        templateData.MTAvg = stateOccupationData[i].averageWage;
                        templateData.MTLo = stateOccupationData[i].lowWage;
                        templateData.MTMed = stateOccupationData[i].medianWage;
                        templateData.MTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NE":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NE = false;
                    } else {
                        templateData.NE = true;
                        templateData.NEAvg = stateOccupationData[i].averageWage;
                        templateData.NELo = stateOccupationData[i].lowWage;
                        templateData.NEMed = stateOccupationData[i].medianWage;
                        templateData.NEHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NV":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NV = false;
                    } else {
                        templateData.NV = true;
                        templateData.NVAvg = stateOccupationData[i].averageWage;
                        templateData.NVLo = stateOccupationData[i].lowWage;
                        templateData.NVMed = stateOccupationData[i].medianWage;
                        templateData.NVHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NH":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NH = false;
                    } else {
                        templateData.NH = true;
                        templateData.NHAvg = stateOccupationData[i].averageWage;
                        templateData.NHLo = stateOccupationData[i].lowWage;
                        templateData.NHMed = stateOccupationData[i].medianWage;
                        templateData.NHHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NJ":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NJ = false;
                    } else {
                        templateData.NJ = true;
                        templateData.NJAvg = stateOccupationData[i].averageWage;
                        templateData.NJLo = stateOccupationData[i].lowWage;
                        templateData.NJMed = stateOccupationData[i].medianWage;
                        templateData.NJHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NM":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NM = false;
                    } else {
                        templateData.NM = true;
                        templateData.NMAvg = stateOccupationData[i].averageWage;
                        templateData.NMLo = stateOccupationData[i].lowWage;
                        templateData.NMMed = stateOccupationData[i].medianWage;
                        templateData.NMHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NY":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NY = false;
                    } else {
                        templateData.NY = true;
                        templateData.NYAvg = stateOccupationData[i].averageWage;
                        templateData.NYLo = stateOccupationData[i].lowWage;
                        templateData.NYMed = stateOccupationData[i].medianWage;
                        templateData.NYHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NC":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NC = false;
                    } else {
                        templateData.NC = true;
                        templateData.NCAvg = stateOccupationData[i].averageWage;
                        templateData.NCLo = stateOccupationData[i].lowWage;
                        templateData.NCMed = stateOccupationData[i].medianWage;
                        templateData.NCHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "ND":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.ND = false;
                    } else {
                        templateData.ND = true;
                        templateData.NDAvg = stateOccupationData[i].averageWage;
                        templateData.NDLo = stateOccupationData[i].lowWage;
                        templateData.NDMed = stateOccupationData[i].medianWage;
                        templateData.NDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "OH":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.OH = false;
                    } else {
                        templateData.OH = true;
                        templateData.OHAvg = stateOccupationData[i].averageWage;
                        templateData.OHLo = stateOccupationData[i].lowWage;
                        templateData.OHMed = stateOccupationData[i].medianWage;
                        templateData.OHHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "OK":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.OK = false;
                    } else {
                        templateData.OK = true;
                        templateData.OKAvg = stateOccupationData[i].averageWage;
                        templateData.OKLo = stateOccupationData[i].lowWage;
                        templateData.OKMed = stateOccupationData[i].medianWage;
                        templateData.OKHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "OR":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.OR = false;
                    } else {
                        templateData.OR = true;
                        templateData.ORAvg = stateOccupationData[i].averageWage;
                        templateData.ORLo = stateOccupationData[i].lowWage;
                        templateData.ORMed = stateOccupationData[i].medianWage;
                        templateData.ORHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "PA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.PA = false;
                    } else {
                        templateData.PA = true;
                        templateData.PAAvg = stateOccupationData[i].averageWage;
                        templateData.PALo = stateOccupationData[i].lowWage;
                        templateData.PAMed = stateOccupationData[i].medianWage;
                        templateData.PAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "RI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.RI = false;
                    } else {
                        templateData.RI = true;
                        templateData.RIAvg = stateOccupationData[i].averageWage;
                        templateData.RILo = stateOccupationData[i].lowWage;
                        templateData.RIMed = stateOccupationData[i].medianWage;
                        templateData.RIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "SC":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.SC = false;
                    } else {
                        templateData.SC = true;
                        templateData.SCAvg = stateOccupationData[i].averageWage;
                        templateData.SCLo = stateOccupationData[i].lowWage;
                        templateData.SCMed = stateOccupationData[i].medianWage;
                        templateData.SCHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "SD":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.SD = false;
                    } else {
                        templateData.SD = true;
                        templateData.SDAvg = stateOccupationData[i].averageWage;
                        templateData.SDLo = stateOccupationData[i].lowWage;
                        templateData.SDMed = stateOccupationData[i].medianWage;
                        templateData.SDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "TN":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.TN = false;
                    } else {
                        templateData.TN = true;
                        templateData.TNAvg = stateOccupationData[i].averageWage;
                        templateData.TNLo = stateOccupationData[i].lowWage;
                        templateData.TNMed = stateOccupationData[i].medianWage;
                        templateData.TNHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "TX":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.TX = false;
                    } else {
                        templateData.TX = true;
                        templateData.TXAvg = stateOccupationData[i].averageWage;
                        templateData.TXLo = stateOccupationData[i].lowWage;
                        templateData.TXMed = stateOccupationData[i].medianWage;
                        templateData.TXHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "UT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.UT = false;
                    } else {
                        templateData.UT = true;
                        templateData.UTAvg = stateOccupationData[i].averageWage;
                        templateData.UTLo = stateOccupationData[i].lowWage;
                        templateData.UTMed = stateOccupationData[i].medianWage;
                        templateData.UTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "VT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.VT = false;
                    } else {
                        templateData.VT = true;
                        templateData.VTAvg = stateOccupationData[i].averageWage;
                        templateData.VTLo = stateOccupationData[i].lowWage;
                        templateData.VTMed = stateOccupationData[i].medianWage;
                        templateData.VTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "VA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.VA = false;
                    } else {
                        templateData.VA = true;
                        templateData.VAAvg = stateOccupationData[i].averageWage;
                        templateData.VALo = stateOccupationData[i].lowWage;
                        templateData.VAMed = stateOccupationData[i].medianWage;
                        templateData.VAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WA = false;
                    } else {
                        templateData.WA = true;
                        templateData.WAAvg = stateOccupationData[i].averageWage;
                        templateData.WALo = stateOccupationData[i].lowWage;
                        templateData.WAMed = stateOccupationData[i].medianWage;
                        templateData.WAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WV":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WV = false;
                    } else {
                        templateData.WV = true;
                        templateData.WVAvg = stateOccupationData[i].averageWage;
                        templateData.WVLo = stateOccupationData[i].lowWage;
                        templateData.WVMed = stateOccupationData[i].medianWage;
                        templateData.WVHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WI = false;
                    } else {
                        templateData.WI = true;
                        templateData.WIAvg = stateOccupationData[i].averageWage;
                        templateData.WILo = stateOccupationData[i].lowWage;
                        templateData.WIMed = stateOccupationData[i].medianWage;
                        templateData.WIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WY":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WY = false;
                    } else {
                        templateData.WY = true;
                        templateData.WYAvg = stateOccupationData[i].averageWage;
                        templateData.WYLo = stateOccupationData[i].lowWage;
                        templateData.WYMed = stateOccupationData[i].medianWage;
                        templateData.WYHi = stateOccupationData[i].highWage;
                    }
                    break;

                }
            }
            
            if (req.user) {
                templateData.loggedIn = true;
            } else {
                templateData.loggedIn = false;
            }

            res.render('salary.html', templateData);

        },
        function (err) {
            res.writeHead(500);
            res.end('Server error');
        });

},
function (err) {
 res.writeHead(500);
 res.end('Server error');
});
}

module.exports.handleEducationPage = function(req, res) {
    occupationModel.find(req.params.occupation,
     function (occupation) {
         occupationModel.getStateData(req.params.occupation,
            function (stateOccupationData) {

             var templateData = new Object();
             setupIconTemplateData(templateData, occupation);

             templateData.occupationTitle = occupation.title;

             templateData.NATAvg = occupation.averageWage;
             templateData.NATLo = occupation.lowWage;
             templateData.NATMed = occupation.medianWage;
             templateData.NATHi = occupation.highWage;


             for (i = 0; i < stateOccupationData.length; i++) {
                switch(stateOccupationData[i].stateCode) {
                    case "AL":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AL = false;
                    } else {
                        templateData.AL = true;
                        templateData.ALAvg = stateOccupationData[i].averageWage;
                        templateData.ALLo = stateOccupationData[i].lowWage;
                        templateData.ALMed = stateOccupationData[i].medianWage;
                        templateData.ALHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "AK":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AK = false;
                    } else {
                        templateData.AK = true;
                        templateData.AKAvg = stateOccupationData[i].averageWage;
                        templateData.AKLo = stateOccupationData[i].lowWage;
                        templateData.AKMed = stateOccupationData[i].medianWage;
                        templateData.AKHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "AZ":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AZ = false;
                    } else {
                        templateData.AZ = true;
                        templateData.AZAvg = stateOccupationData[i].averageWage;
                        templateData.AZLo = stateOccupationData[i].lowWage;
                        templateData.AZMed = stateOccupationData[i].medianWage;
                        templateData.AZHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "AR":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.AR = false;
                    } else {
                        templateData.AR = true;
                        templateData.ARAvg = stateOccupationData[i].averageWage;
                        templateData.ARLo = stateOccupationData[i].lowWage;
                        templateData.ARMed = stateOccupationData[i].medianWage;
                        templateData.ARHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "CA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.CA = false;
                    } else {
                        templateData.CA = true;
                        templateData.CAAvg = stateOccupationData[i].averageWage;
                        templateData.CALo = stateOccupationData[i].lowWage;
                        templateData.CAMed = stateOccupationData[i].medianWage;
                        templateData.CAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "CO":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.CO = false;
                    } else {
                        templateData.CO = true;
                        templateData.COAvg = stateOccupationData[i].averageWage;
                        templateData.COLo = stateOccupationData[i].lowWage;
                        templateData.COMed = stateOccupationData[i].medianWage;
                        templateData.COHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "CT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.CT = false;
                    } else {
                        templateData.CT = true;
                        templateData.CTAvg = stateOccupationData[i].averageWage;
                        templateData.CTLo = stateOccupationData[i].lowWage;
                        templateData.CTMed = stateOccupationData[i].medianWage;
                        templateData.CTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "DE":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.DE = false;
                    } else {
                        templateData.DE = true;
                        templateData.DEAvg = stateOccupationData[i].averageWage;
                        templateData.DELo = stateOccupationData[i].lowWage;
                        templateData.DEMed = stateOccupationData[i].medianWage;
                        templateData.DEHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "DC":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.DC = false;
                    } else {
                        templateData.DC = true;
                        templateData.DCAvg = stateOccupationData[i].averageWage;
                        templateData.DCLo = stateOccupationData[i].lowWage;
                        templateData.DCMed = stateOccupationData[i].medianWage;
                        templateData.DCHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "FL":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.FL = false;
                    } else {
                        templateData.FL = true;
                        templateData.FLAvg = stateOccupationData[i].averageWage;
                        templateData.FLLo = stateOccupationData[i].lowWage;
                        templateData.FLMed = stateOccupationData[i].medianWage;
                        templateData.FLHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "GA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.GA = false;
                    } else {
                        templateData.GA = true;
                        templateData.GAAvg = stateOccupationData[i].averageWage;
                        templateData.GALo = stateOccupationData[i].lowWage;
                        templateData.GAMed = stateOccupationData[i].medianWage;
                        templateData.GAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "HI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.HI = false;
                    } else {
                        templateData.HI = true;
                        templateData.HIAvg = stateOccupationData[i].averageWage;
                        templateData.HILo = stateOccupationData[i].lowWage;
                        templateData.HIMed = stateOccupationData[i].medianWage;
                        templateData.HIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "ID":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.ID = false;
                    } else {
                        templateData.ID = true;
                        templateData.IDAvg = stateOccupationData[i].averageWage;
                        templateData.IDLo = stateOccupationData[i].lowWage;
                        templateData.IDMed = stateOccupationData[i].medianWage;
                        templateData.IDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "IL":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.IL = false;
                    } else {
                        templateData.IL = true;
                        templateData.ILAvg = stateOccupationData[i].averageWage;
                        templateData.ILLo = stateOccupationData[i].lowWage;
                        templateData.ILMed = stateOccupationData[i].medianWage;
                        templateData.ILHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "IN":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.IN = false;
                    } else {
                        templateData.IN = true;
                        templateData.INAvg = stateOccupationData[i].averageWage;
                        templateData.INLo = stateOccupationData[i].lowWage;
                        templateData.INMed = stateOccupationData[i].medianWage;
                        templateData.INHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "IA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.IA = false;
                    } else {
                        templateData.IA = true;
                        templateData.IAAvg = stateOccupationData[i].averageWage;
                        templateData.IALo = stateOccupationData[i].lowWage;
                        templateData.IAMed = stateOccupationData[i].medianWage;
                        templateData.IAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "KS":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.KS = false;
                    } else {
                        templateData.KS = true;
                        templateData.KSAvg = stateOccupationData[i].averageWage;
                        templateData.KSLo = stateOccupationData[i].lowWage;
                        templateData.KSMed = stateOccupationData[i].medianWage;
                        templateData.KSHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "KY":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.KY = false;
                    } else {
                        templateData.KY = true;
                        templateData.KYAvg = stateOccupationData[i].averageWage;
                        templateData.KYLo = stateOccupationData[i].lowWage;
                        templateData.KYMed = stateOccupationData[i].medianWage;
                        templateData.KYHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "LA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.LA = false;
                    } else {
                        templateData.LA = true;
                        templateData.LAAvg = stateOccupationData[i].averageWage;
                        templateData.LALo = stateOccupationData[i].lowWage;
                        templateData.LAMed = stateOccupationData[i].medianWage;
                        templateData.LAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "ME":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.ME = false;
                    } else {
                        templateData.ME = true;
                        templateData.MEAvg = stateOccupationData[i].averageWage;
                        templateData.MELo = stateOccupationData[i].lowWage;
                        templateData.MEMed = stateOccupationData[i].medianWage;
                        templateData.MEHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MD":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MD = false;
                    } else {
                        templateData.MD = true;
                        templateData.MDAvg = stateOccupationData[i].averageWage;
                        templateData.MDLo = stateOccupationData[i].lowWage;
                        templateData.MDMed = stateOccupationData[i].medianWage;
                        templateData.MDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MA = false;
                    } else {
                        templateData.MA = true;
                        templateData.MAAvg = stateOccupationData[i].averageWage;
                        templateData.MALo = stateOccupationData[i].lowWage;
                        templateData.MAMed = stateOccupationData[i].medianWage;
                        templateData.MAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MI = false;
                    } else {
                        templateData.MI = true;
                        templateData.MIAvg = stateOccupationData[i].averageWage;
                        templateData.MILo = stateOccupationData[i].lowWage;
                        templateData.MIMed = stateOccupationData[i].medianWage;
                        templateData.MIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MN":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MN = false;
                    } else {
                        templateData.MN = true;
                        templateData.MNAvg = stateOccupationData[i].averageWage;
                        templateData.MNLo = stateOccupationData[i].lowWage;
                        templateData.MNMed = stateOccupationData[i].medianWage;
                        templateData.MNHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MS":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MS = false;
                    } else {
                        templateData.MS = true;
                        templateData.MSAvg = stateOccupationData[i].averageWage;
                        templateData.MSLo = stateOccupationData[i].lowWage;
                        templateData.MSMed = stateOccupationData[i].medianWage;
                        templateData.MSHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MO":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MO = false;
                    } else {
                        templateData.MO = true;
                        templateData.MOAvg = stateOccupationData[i].averageWage;
                        templateData.MOLo = stateOccupationData[i].lowWage;
                        templateData.MOMed = stateOccupationData[i].medianWage;
                        templateData.MOHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "MT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.MT = false;
                    } else {
                        templateData.MT = true;
                        templateData.MTAvg = stateOccupationData[i].averageWage;
                        templateData.MTLo = stateOccupationData[i].lowWage;
                        templateData.MTMed = stateOccupationData[i].medianWage;
                        templateData.MTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NE":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NE = false;
                    } else {
                        templateData.NE = true;
                        templateData.NEAvg = stateOccupationData[i].averageWage;
                        templateData.NELo = stateOccupationData[i].lowWage;
                        templateData.NEMed = stateOccupationData[i].medianWage;
                        templateData.NEHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NV":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NV = false;
                    } else {
                        templateData.NV = true;
                        templateData.NVAvg = stateOccupationData[i].averageWage;
                        templateData.NVLo = stateOccupationData[i].lowWage;
                        templateData.NVMed = stateOccupationData[i].medianWage;
                        templateData.NVHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NH":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NH = false;
                    } else {
                        templateData.NH = true;
                        templateData.NHAvg = stateOccupationData[i].averageWage;
                        templateData.NHLo = stateOccupationData[i].lowWage;
                        templateData.NHMed = stateOccupationData[i].medianWage;
                        templateData.NHHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NJ":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NJ = false;
                    } else {
                        templateData.NJ = true;
                        templateData.NJAvg = stateOccupationData[i].averageWage;
                        templateData.NJLo = stateOccupationData[i].lowWage;
                        templateData.NJMed = stateOccupationData[i].medianWage;
                        templateData.NJHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NM":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NM = false;
                    } else {
                        templateData.NM = true;
                        templateData.NMAvg = stateOccupationData[i].averageWage;
                        templateData.NMLo = stateOccupationData[i].lowWage;
                        templateData.NMMed = stateOccupationData[i].medianWage;
                        templateData.NMHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NY":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NY = false;
                    } else {
                        templateData.NY = true;
                        templateData.NYAvg = stateOccupationData[i].averageWage;
                        templateData.NYLo = stateOccupationData[i].lowWage;
                        templateData.NYMed = stateOccupationData[i].medianWage;
                        templateData.NYHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "NC":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.NC = false;
                    } else {
                        templateData.NC = true;
                        templateData.NCAvg = stateOccupationData[i].averageWage;
                        templateData.NCLo = stateOccupationData[i].lowWage;
                        templateData.NCMed = stateOccupationData[i].medianWage;
                        templateData.NCHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "ND":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.ND = false;
                    } else {
                        templateData.ND = true;
                        templateData.NDAvg = stateOccupationData[i].averageWage;
                        templateData.NDLo = stateOccupationData[i].lowWage;
                        templateData.NDMed = stateOccupationData[i].medianWage;
                        templateData.NDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "OH":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.OH = false;
                    } else {
                        templateData.OH = true;
                        templateData.OHAvg = stateOccupationData[i].averageWage;
                        templateData.OHLo = stateOccupationData[i].lowWage;
                        templateData.OHMed = stateOccupationData[i].medianWage;
                        templateData.OHHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "OK":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.OK = false;
                    } else {
                        templateData.OK = true;
                        templateData.OKAvg = stateOccupationData[i].averageWage;
                        templateData.OKLo = stateOccupationData[i].lowWage;
                        templateData.OKMed = stateOccupationData[i].medianWage;
                        templateData.OKHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "OR":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.OR = false;
                    } else {
                        templateData.OR = true;
                        templateData.ORAvg = stateOccupationData[i].averageWage;
                        templateData.ORLo = stateOccupationData[i].lowWage;
                        templateData.ORMed = stateOccupationData[i].medianWage;
                        templateData.ORHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "PA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.PA = false;
                    } else {
                        templateData.PA = true;
                        templateData.PAAvg = stateOccupationData[i].averageWage;
                        templateData.PALo = stateOccupationData[i].lowWage;
                        templateData.PAMed = stateOccupationData[i].medianWage;
                        templateData.PAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "RI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.RI = false;
                    } else {
                        templateData.RI = true;
                        templateData.RIAvg = stateOccupationData[i].averageWage;
                        templateData.RILo = stateOccupationData[i].lowWage;
                        templateData.RIMed = stateOccupationData[i].medianWage;
                        templateData.RIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "SC":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.SC = false;
                    } else {
                        templateData.SC = true;
                        templateData.SCAvg = stateOccupationData[i].averageWage;
                        templateData.SCLo = stateOccupationData[i].lowWage;
                        templateData.SCMed = stateOccupationData[i].medianWage;
                        templateData.SCHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "SD":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.SD = false;
                    } else {
                        templateData.SD = true;
                        templateData.SDAvg = stateOccupationData[i].averageWage;
                        templateData.SDLo = stateOccupationData[i].lowWage;
                        templateData.SDMed = stateOccupationData[i].medianWage;
                        templateData.SDHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "TN":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.TN = false;
                    } else {
                        templateData.TN = true;
                        templateData.TNAvg = stateOccupationData[i].averageWage;
                        templateData.TNLo = stateOccupationData[i].lowWage;
                        templateData.TNMed = stateOccupationData[i].medianWage;
                        templateData.TNHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "TX":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.TX = false;
                    } else {
                        templateData.TX = true;
                        templateData.TXAvg = stateOccupationData[i].averageWage;
                        templateData.TXLo = stateOccupationData[i].lowWage;
                        templateData.TXMed = stateOccupationData[i].medianWage;
                        templateData.TXHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "UT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.UT = false;
                    } else {
                        templateData.UT = true;
                        templateData.UTAvg = stateOccupationData[i].averageWage;
                        templateData.UTLo = stateOccupationData[i].lowWage;
                        templateData.UTMed = stateOccupationData[i].medianWage;
                        templateData.UTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "VT":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.VT = false;
                    } else {
                        templateData.VT = true;
                        templateData.VTAvg = stateOccupationData[i].averageWage;
                        templateData.VTLo = stateOccupationData[i].lowWage;
                        templateData.VTMed = stateOccupationData[i].medianWage;
                        templateData.VTHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "VA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.VA = false;
                    } else {
                        templateData.VA = true;
                        templateData.VAAvg = stateOccupationData[i].averageWage;
                        templateData.VALo = stateOccupationData[i].lowWage;
                        templateData.VAMed = stateOccupationData[i].medianWage;
                        templateData.VAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WA":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WA = false;
                    } else {
                        templateData.WA = true;
                        templateData.WAAvg = stateOccupationData[i].averageWage;
                        templateData.WALo = stateOccupationData[i].lowWage;
                        templateData.WAMed = stateOccupationData[i].medianWage;
                        templateData.WAHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WV":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WV = false;
                    } else {
                        templateData.WV = true;
                        templateData.WVAvg = stateOccupationData[i].averageWage;
                        templateData.WVLo = stateOccupationData[i].lowWage;
                        templateData.WVMed = stateOccupationData[i].medianWage;
                        templateData.WVHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WI":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WI = false;
                    } else {
                        templateData.WI = true;
                        templateData.WIAvg = stateOccupationData[i].averageWage;
                        templateData.WILo = stateOccupationData[i].lowWage;
                        templateData.WIMed = stateOccupationData[i].medianWage;
                        templateData.WIHi = stateOccupationData[i].highWage;
                    }
                    break;
                    case "WY":
                    if (stateOccupationData[i].averageWage == 0) {
                        templateData.WY = false;
                    } else {
                        templateData.WY = true;
                        templateData.WYAvg = stateOccupationData[i].averageWage;
                        templateData.WYLo = stateOccupationData[i].lowWage;
                        templateData.WYMed = stateOccupationData[i].medianWage;
                        templateData.WYHi = stateOccupationData[i].highWage;
                    }
                    break;

                }
            }
            

            var educationType = occupation.educationRequired;
            switch(educationType) {
                case "associate":
                templateData.typeOfSchool = "Undergraduate";
                templateData.typeOfDegree = "Associate's Degree";
                templateData.yearsInSchool = "2";
                templateData.yearsInUndergrad = 2;
                templateData.yearsInGrad = 0;
                break;
                case "bachelor":
                templateData.typeOfSchool = "Undergraduate";
                templateData.typeOfDegree = "Bachelor's Degree";
                templateData.yearsInSchool = "4";
                templateData.yearsInUndergrad = 4;
                templateData.yearsInGrad = 0;
                break;
                case "master":
                templateData.typeOfSchool = "Graduate";
                templateData.typeOfDegree = "Master's Degree";
                templateData.yearsInSchool = "6";
                templateData.yearsInUndergrad = 4;
                templateData.yearsInGrad = 2;

                templateData.gradSchool = true;
                break;
                case "doctoral or professional":
                templateData.typeOfSchool = "Graduate or Professional";
                templateData.typeOfDegree = "Doctorate or Professional Degree";
                templateData.yearsInSchool = "8";
                templateData.yearsInUndergrad = 4;
                templateData.yearsInGrad = 4;

                templateData.gradSchool = true;
                break;
                default:
                templateData.typeOfSchool = "N/A";
                templateData.typeOfDegree = "N/A";
                templateData.yearsInSchool = "N/A";
                templateData.yearsInUndergrad = 0;
                templateData.yearsInGrad = 0;
            }

            if (req.user) {
                templateData.loggedIn = true;
            } else {
                templateData.loggedIn = false;
            }

            res.render('education.html', templateData);

        },
        function (err) {
            res.writeHead(500);
            res.end('Server error');
        });

},
function (err) {
 res.writeHead(500);
 res.end('Server error');
});
}

module.exports.handleSkillsPage = function(req, res) {
    occupationModel.find(req.params.occupation,
     function (occupation) {
         occupationModel.getSkills(occupation.soc,
            function (skills) {

                var templateData = new Object();
                setupIconTemplateData(templateData, occupation);
                templateData.occupationTitle = occupation.title;

                if (req.user) {
                    templateData.loggedIn = true;
                } else {
                    templateData.loggedIn = false;
                }

                if (skills != null) {
                    skillsText = JSON.parse(skills.skillsText);

                    var skillsArray = [];

                    if (skills.naturalistPercent > 0) {
                        skillsArray.push([skills.naturalistPercent, "Naturalistic Intelligence", skillsText.naturalistSkills]);
                    }
                    if (skills.musicalPercent > 0) {
                        skillsArray.push([skills.musicalPercent, "Musical Intelligence", skillsText.musicalSkills]);
                    }
                    if (skills.logicalPercent > 0) {
                        skillsArray.push([skills.logicalPercent, "Logical-Mathematical Intelligence", skillsText.logicalSkills]);
                    }
                    if (skills.existentialPercent > 0) {
                        skillsArray.push([skills.existentialPercent, "Existential Intelligence", skillsText.existentialSkills]);
                    }
                    if (skills.interpersonalPercent > 0) {
                        skillsArray.push([skills.interpersonalPercent, "Interpersonal Intelligence", skillsText.interpersonalSkills]);
                    }
                    if (skills.bodyPercent > 0) {
                        skillsArray.push([skills.bodyPercent, "Bodily-Kinesthetic Intelligence", skillsText.bodySkills]);
                    }
                    if (skills.linguisticPercent > 0) {
                        skillsArray.push([skills.linguisticPercent, "Linguistic Intelligence", skillsText.linguisticSkills]);
                    }
                    if (skills.intrapersonalPercent > 0) {
                        skillsArray.push([skills.intrapersonalPercent, "Intra-personal Intelligence", skillsText.intrapersonalSkills]);
                    }
                    if (skills.spatialPercent > 0) {
                        skillsArray.push([skills.spatialPercent, "Spatial Intelligence", skillsText.spatialSkills]);
                    }

                    skillsArray.sort(function(a,b){return b[0]-a[0];});

                    templateData.skillsArray = skillsArray;
                }

                res.render('skills.html', templateData);


            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            })
},
function (err) {
 res.writeHead(500);
 res.end('Server error');
});
}

module.exports.handleRandomCareer = function (req, res) {
    // If both x and y are specified in the query string, then the request should
    // return a random SOC code in the region specified by the coordinates.
    if ('x' in req.query && 'y' in req.query) {
        // TECH DEBT: Robustness issues
        occupationModel.getRandomSOCInWOWRegion(
            req.query,
            function (soc) {
                res.redirect('/career/' + soc + '/video');
            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            });
    }
    else {
        occupationModel.getRandomSOC(
            function (soc) {
                res.redirect('/career/' + soc + '/video');
            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            });
    }
}

function setupIconTemplateData(dict, occupation) {
    dict.wageTypeIsAnnual = (occupation.wageType == 'annual');
    var wageString = '$' + format.formatWithThousandSeparators(occupation.averageWage);
    // TECH DEBT: JS doesn't have very good support for named constants but we should find a way around that
    if (occupation.averageWageOutOfRange == 1) {
        wageString = '>=' + wageString;
    }
    dict.averageWage = wageString;

    var educationDecoder = { 'none' : 'No education required',
    'high school' : 'High school education',
    'some college' : 'Some college',
    'postsecondary nondegree' : 'Postsecondary nondegree award',
    'associate' : "Associate's degree",
    'bachelor' : "Bachelor's degree",
    'master' : "Master's degree",
    'doctoral or professional' : "Doctoral or Professional degree" };
    // TECH DEBT: Robustness issues
    var educationString = educationDecoder[occupation.educationRequired];
    dict.educationRequired = educationString;

    dict.careerGrowth = format.formatPercentage(occupation.careerGrowth);
}
