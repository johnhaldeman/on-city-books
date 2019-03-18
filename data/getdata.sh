#!/bin/bash

rm *.zip*
rm *.csv*
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2019.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2018.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2017.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2016.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2015.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2014.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2013.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2012.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2011.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2010.zip
wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36" https://efis.fma.csc.gov.on.ca/fir/MultiYearReport/fir_data_2009.zip

find *.zip -exec unzip {} \;
