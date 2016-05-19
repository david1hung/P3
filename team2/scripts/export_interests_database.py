#!/usr/bin/env python

import openpyxl
import os.path
import sys
import warnings

if len(sys.argv) != 3:
    sys.exit("export_interests_database: missing filenames; first filename is the input file for national data, second filename is the output file")
if not os.path.isfile(sys.argv[1]):
    sys.exit("export_interests_database: {0} not found".format(sys.argv[1]))
if os.path.dirname(sys.argv[2]) != "" and not os.path.exists(os.path.dirname(sys.argv[2])):
    sys.exit("export_interests_database: directory {0} does not exist".format(sys.argv[2]))

def formatRating(rating):
    return (rating - 1.0) / 6.0

# Due to the names of the sheets in the spreadsheet, a warning is raised about
# a sheet name conflicting with a reserved name. Fortunately, this does not
# affect the sheet that we're interested in, so suppress this warning.
with warnings.catch_warnings():
    warnings.simplefilter('ignore')
    workbook = openpyxl.load_workbook(sys.argv[1], read_only=True)

try:
    worksheet = workbook.get_sheet_by_name("Interests")
except KeyError:
    sys.exit("export_interests_database: worksheet \"Interests\" not found")

class Occupation:
    def __init__(self, fullSoc):
        self.fullSoc = fullSoc

    def setRealistic(self, realistic):
        self.realistic = realistic

    def setInvestigative(self, investigative):
        self.investigative = investigative

    def setArtistic(self, artistic):
        self.artistic = artistic

    def setSocial(self, social):
        self.social = social

    def setEnterprising(self, enterprising):
        self.enterprising = enterprising

    def setConventional(self, conventional):
        self.conventional = conventional

    # Pre-condition: each of the above set functions has been called at least once
    def toString(self):
        return u'\t'.join([self.fullSoc[0:7], 
                           str(self.realistic),
                           str(self.investigative),
                           str(self.artistic),
                           str(self.social),
                           str(self.enterprising),
                           str(self.conventional)])

# This dictionary maps a 6-digit SOC code to an Occupation object
occupations = {}

# Read all rows except the header row
rowCount = 0
for row in worksheet.rows:
    rowCount += 1

    # Skip the first row
    if rowCount <= 1:
        continue

    # Read only rows that give the Occupational Interest value
    if row[4].value != u'OI':
        continue

    # The interests database uses the 8-digit SOC code, but our application
    # currently only supports 6-digit SOC codes. Whenever there are multiple
    # 8-digit occupations that map to a single 6-digit occupation, we currently
    # arbitrarily select the first one that we see, and ignore the rest.
    fullSoc = row[0].value
    soc = fullSoc[0:7]
    if soc in occupations:
        if occupations[soc].fullSoc != fullSoc:
            continue
    else:
        occupations[soc] = Occupation(fullSoc)
    
    interestArea = row[2].value
    if interestArea == u'1.B.1.a':
        occupations[soc].setRealistic(formatRating(row[6].value))
    elif interestArea == u'1.B.1.b':
        occupations[soc].setInvestigative(formatRating(row[6].value))
    elif interestArea == u'1.B.1.c':
        occupations[soc].setArtistic(formatRating(row[6].value))
    elif interestArea == u'1.B.1.d':
        occupations[soc].setSocial(formatRating(row[6].value))
    elif interestArea == u'1.B.1.e':
        occupations[soc].setEnterprising(formatRating(row[6].value))
    else:
        occupations[soc].setConventional(formatRating(row[6].value))

# Write out the stored data
with open(sys.argv[2], "w") as outfile:
    for occupation in occupations.values():
        outfile.write(occupation.toString().encode("UTF-8"))
        outfile.write(u'\n'.encode("UTF-8"))
