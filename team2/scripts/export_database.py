#!/usr/bin/env python

import openpyxl
import os.path
import sys

if len(sys.argv) == 1:
    sys.exit("export_database: missing input filename")
if len(sys.argv) == 2:
    sys.exit("export_database: missing output filename")
if not os.path.isfile(sys.argv[1]):
    sys.exit("export_database: {0} not found".format(sys.argv[1]))
if os.path.dirname(sys.argv[2]) != "" and not os.path.exists(os.path.dirname(sys.argv[2])):
    sys.exit("export_database: directory {0} does not exist".format(sys.argv[2]))

def decimalIsRange(decimal):
    return unicode(decimal).find(u">=")

def formatDecimal(decimal):
    return unicode(decimal).replace(u",", u"").replace(u"$", u"").replace(u">=", u"")

educationDict = { u"No formal education credential" : u"none",
                  u"High school diploma or equivalent" : u"high school",
                  u"Postsecondary nondegree award" : u"postsecondary nondegree",
                  u"Associate's degree" : u"associate",
                  u"Bachelor's degree" : u"bachelor",
                  u"Master's degree" : u"master",
                  u"Doctoral or professional degree" : u"doctoral or professional" }

workbook = openpyxl.load_workbook(sys.argv[1], read_only=True)

try:
    worksheet = workbook.get_sheet_by_name("Table 1.7")
except KeyError:
    sys.exit("export_database: worksheet \"Table 1.7\" not found, please check to make sure you are using the Bureau Labor of Statistics 2014 occupational data")

with open(sys.argv[2], "w") as outfile:
    # Read all rows except the header row
    rowCount = 0
    for row in worksheet.rows:
        rowCount += 1

        # Skip the first three rows
        if rowCount <= 3:
            continue

        # Ignore row if it is not the data for a single occupation
        if row[2].value != u"Line item":
            continue

        try:
            educationRequired = educationDict[row[10].value.strip()]
        except KeyError:
            educationRequired = u"none"
        
        # Some occupations where the median annual wage is very large indicate a range for the salary
        medianAnnualWageOutOfRange = u"1" if decimalIsRange(row[9].value) else u"0"

        outfile.write(u"\t".join([row[1].value, row[0].value, formatDecimal(row[3].value), formatDecimal(row[4].value), formatDecimal(row[8].value), formatDecimal(row[9].value), medianAnnualWageOutOfRange, educationRequired]).encode("UTF-8"))
        outfile.write(u"\n")
