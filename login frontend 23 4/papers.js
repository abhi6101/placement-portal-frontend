
// Array to store information about previous year papers.
// Each object contains:
// - title: Display title of the paper
// - category: Used for filtering (e.g., 'aptitude', 'coding', 'reasoning', 'verbal')
// - company: The company associated with the paper
// - year: The year the paper is from (for sorting and display)
// - link: The Google Drive shareable link to the PDF
// IMPORTANT: You should update the 'title', 'company', and 'year' for each paper
// to accurately reflect the content of your PDF files.
const previousPapers = [
    { title: "TCS NQT Aptitude Paper 2023", category: "aptitude", company: "TCS", year: 2023, link: "https://drive.google.com/file/d/1--q6B-0SxOmNI1GqQY2LVF-hPEaF7YeU/view?usp=sharing" },
    { title: "Infosys Reasoning Questions 2022", category: "reasoning", company: "Infosys", year: 2022, link: "https://drive.google.com/file/d/1-7hbGf6yI8tvSKA_gNfPtw8Q8zzjS3O9/view?usp=sharing" },
    { title: "Wipro Coding Challenge 2021", category: "coding", company: "Wipro", year: 2021, link: "https://drive.google.com/file/d/1-BqXf-EWCm46IZ-cdRnPpi8hUGMlnWQp/view?usp=sharing" },
    { title: "Cognizant Verbal Ability Test 2023", category: "verbal", company: "Cognizant", year: 2023, link: "https://drive.google.com/file/d/1-EkTEdwn8oHI0TeYviD69lHWnU8kFvPv/view?usp=sharing" },
    { title: "Accenture Aptitude Practice 2024", category: "aptitude", company: "Accenture", year: 2024, link: "https://drive.google.com/file/d/1-QsTakEawyh0l-jqRX09I32B_P_KAYXF/view?usp=sharing" },
    { title: "Capgemini Reasoning Sample 2023", category: "reasoning", company: "Capgemini", year: 2023, link: "https://drive.google.com/file/d/1-UmkeEQ5LJY2PzrLDrU4VhTOx1vmdtQF/view?usp=sharing" },
    { title: "HCL Technologies Coding 2022", category: "coding", company: "HCL", year: 2022, link: "https://drive.google.com/file/d/1-WH7iqN75FpCOFlNiy8GWV5uAj6-DBTd/view?usp=sharing" },
    { title: "Deloitte Verbal Ability 2021", category: "verbal", company: "Deloitte", year: 2021, link: "https://drive.google.com/file/d/1-ZzlVKihMdeynUvxkOvPRHku2sLKJE5X/view?usp=sharing" },
    { title: "Amazon SDE Aptitude 2024", category: "aptitude", company: "Amazon", year: 2024, link: "https://drive.google.com/file/d/107-rNGezkMimONWcnYtg-rWytYzBBJJ_/view?usp=sharing" },
    { title: "Microsoft Coding Interview 2023", category: "coding", company: "Microsoft", year: 2023, link: "https://drive.google.com/file/d/10DW_gl6bJPTghU_ixIyXLo4ZvL3Y4-s6/view?usp=sharing" },
    { title: "Google Reasoning Puzzle 2022", category: "reasoning", company: "Google", year: 2022, link: "https://drive.google.com/file/d/10Fz3GVIM8mNDp5vUvXZigXvyCzt0G_bp/view?usp=sharing" },
    { title: "Apple Verbal Comprehension 2021", category: "verbal", company: "Apple", year: 2021, link: "https://drive.google.com/file/d/10TZC_8s6tR8u7rjddfz8wxQsumhKajak/view?usp=sharing" },
    { title: "IBM Aptitude Test 2020", category: "aptitude", company: "IBM", year: 2020, link: "https://drive.google.com/file/d/10xDkrOuhq5qkMXaGalaUB5iVU_4YaSr9/view?usp=sharing" },
    { title: "Oracle Coding Questions 2024", category: "coding", company: "Oracle", year: 2024, link: "https://drive.google.com/file/d/1127IuXoKuNWAt7io3sw5RyFCzfZLRjE7/view?usp=sharing" },
    { title: "SAP Reasoning Ability 2023", category: "reasoning", company: "SAP", year: 2023, link: "https://drive.google.com/file/d/117UBuDvOlNtwthXpUQx0xtW29C-XZM3w/view?usp=sharing" },
    { title: "Cisco Verbal Test 2022", category: "verbal", company: "Cisco", year: 2022, link: "https://drive.google.com/file/d/11QjwdRapfNJABaCxkRzLlPWJWtekmoFz/view?usp=sharing" },
    { title: "Intel Aptitude Exam 2021", category: "aptitude", company: "Intel", year: 2021, link: "https://drive.google.com/file/d/11trMWKXO6xITRO-FS17kvagh90eecASh/view?usp=sharing" },
    { title: "Qualcomm Coding Round 2020", category: "coding", company: "Qualcomm", year: 2020, link: "https://drive.google.com/file/d/11x5plvaHI75rC1sIejGDkwMSEOZp9VnZ/view?usp=sharing" },
    { title: "NVIDIA Reasoning Challenges 2024", category: "reasoning", company: "NVIDIA", year: 2024, link: "https://drive.google.com/file/d/12PFaVx7D7iEO85FCsSBD1tSZ27TRqE8H/view?usp=sharing" },
    { title: "Adobe Verbal Assessment 2023", category: "verbal", company: "Adobe", year: 2023, link: "https://drive.google.com/file/d/12WKMbyG-uKivgqnVJtmC35fl_BfXngSG/view?usp=sharing" },
    { title: "Salesforce Aptitude Questions 2022", category: "aptitude", company: "Salesforce", year: 2022, link: "https://drive.google.com/file/d/12lhdgU6Pwq5DyPhT5HlyRUKE6EIjCImY/view?usp=sharing" },
    { title: "VMware Coding Test 2021", category: "coding", company: "VMware", year: 2021, link: "https://drive.google.com/file/d/12xULp5y-lhKkoDkPKVmT_1mRvMynuqGB/view?usp=sharing" },
    { title: "HP Reasoning Puzzles 2020", category: "reasoning", company: "HP", year: 2020, link: "https://drive.google.com/file/d/13-BJ1zJ9N1R-A41mZF6W9yVFu0dEQB6j/view?usp=sharing" },
    { title: "Dell Verbal Ability Section 2024", category: "verbal", company: "Dell", year: 2024, link: "https://drive.google.com/file/d/13rjoybNCRaLQxUmCRIK2peCglIoGoL4g/view?usp=sharing" },
    { title: "Lenovo Aptitude Mock 2023", category: "aptitude", company: "Lenovo", year: 2023, link: "https://drive.google.com/file/d/13sjMBPLbafAd_V1mO6Ed1T6aQWqjmfXC/view?usp=sharing" },
    { title: "Samsung Coding Interview 2022", category: "coding", company: "Samsung", year: 2022, link: "https://drive.google.com/file/d/13t1N-T8Y9CN022_eRvVw9rsfICivlikS/view?usp=sharing" },
    { title: "LG Reasoning Test 2021", category: "reasoning", company: "LG", year: 2021, link: "https://drive.google.com/file/d/14CkUONMl94OUPy8IemwZHObFHI4cu8tP/view?usp=sharing" },
    { title: "Philips Verbal Questions 2020", category: "verbal", company: "Philips", year: 2020, link: "https://drive.google.com/file/d/14ekP2lcbf3-oQIVWHpSRFuJx0J6skyYW/view?usp=sharing" },
    { title: "Siemens Aptitude 2024", category: "aptitude", company: "Siemens", year: 2024, link: "https://drive.google.com/file/d/14jixfFSvVMd_EGJXK_AcDZItpdmcvudZ/view?usp=sharing" },
    { title: "Bosch Coding Assessment 2023", category: "coding", company: "Bosch", year: 2023, link: "https://drive.google.com/file/d/14wMx6_iVxtTyAZCPXcurt9ZmVyXvKJhC/view?usp=sharing" },
    { title: "GE Reasoning Section 2022", category: "reasoning", company: "GE", year: 2022, link: "https://drive.google.com/file/d/1540FETztmgq1G3O-FbQiEBVf555OIsi_/view?usp=sharing" },
    { title: "Honeywell Verbal Ability 2021", category: "verbal", company: "Honeywell", year: 2021, link: "https://drive.google.com/file/d/154t4loflGfpjgQt2SenxrUFwNryknac8/view?usp=sharing" },
    { title: "Caterpillar Aptitude 2020", category: "aptitude", company: "Caterpillar", year: 2020, link: "https://drive.google.com/file/d/155_tTvdf9RkNqdY4JlMRx3bDByECxASn/view?usp=sharing" },
    { title: "John Deere Coding 2024", category: "coding", company: "John Deere", year: 2024, link: "https://drive.google.com/file/d/15OjBMqMgg5H_OCsv0W-G1-NcxV9elrXH/view?usp=sharing" },
    { title: "Ford Reasoning 2023", category: "reasoning", company: "Ford", year: 2023, link: "https://drive.google.com/file/d/15QaW6jFfWTOmrCgkZEyHXc52T4mu5_SE/view?usp=sharing" },
    { title: "General Motors Verbal 2022", category: "verbal", company: "GM", year: 2022, link: "https://drive.google.com/file/d/15SC_sbfSRb3YrZ9FNFZIsXSpN6a6-6b3/view?usp=sharing" },
    { title: "Tesla Aptitude Test 2021", category: "aptitude", company: "Tesla", year: 2021, link: "https://drive.google.com/file/d/15aLHuAhzEXJptQtmE1_xpYqusUYZ9K5E/view?usp=sharing" },
    { title: "SpaceX Coding Interview 2020", category: "coding", company: "SpaceX", year: 2020, link: "https://drive.google.com/file/d/15rIB9QfmpBZj7qIEQiodhzkHt8_yS1XB/view?usp=sharing" },
    { title: "Boeing Reasoning 2024", category: "reasoning", company: "Boeing", year: 2024, link: "https://drive.google.com/file/d/15wDXAw75SXvINB5MT3o6TxHPNlNWGGnM/view?usp=sharing" },
    { title: "Airbus Verbal Ability 2023", category: "verbal", company: "Airbus", year: 2023, link: "https://drive.google.com/file/d/16XOacSGthezVRANUGD0X1kvHPmM9gHfa/view?usp=sharing" },
    { title: "Lockheed Martin Aptitude 2022", category: "aptitude", company: "Lockheed Martin", year: 2022, link: "https://drive.google.com/file/d/16kP6S38wjOMvBFaVPGAozL5K37zs_DVP/view?usp=sharing" },
    { title: "Northrop Grumman Coding 2021", category: "coding", company: "Northrop Grumman", year: 2021, link: "https://drive.google.com/file/d/17DJW-bD0qOL0BvTR9oZrF2ghM69gHESG/view?usp=sharing" },
    { title: "Raytheon Reasoning 2020", category: "reasoning", company: "Raytheon", year: 2020, link: "https://drive.google.com/file/d/17UVmM3fW47CWLNlDEsMrwHP1nuwEa57a/view?usp=sharing" },
    { title: "BAE Systems Verbal 2024", category: "verbal", company: "BAE Systems", year: 2024, link: "https://drive.google.com/file/d/18MbfHre1QGlJRlNJ750DvlMep7uPwHbV/view?usp=sharing" },
    { title: "General Dynamics Aptitude 2023", category: "aptitude", company: "General Dynamics", year: 2023, link: "https://drive.google.com/file/d/18ViuMzz25IfEM28SCy1EMLpi1l-0mkXn/view?usp=sharing" },
    { title: "L3Harris Coding 2022", category: "coding", company: "L3Harris", year: 2022, link: "https://drive.google.com/file/d/18aBSMed6m2QkWTAZzizoOOndRcHUbncf/view?usp=sharing" },
    { title: "Collins Aerospace Reasoning 2021", category: "reasoning", company: "Collins Aerospace", year: 2021, link: "https://drive.google.com/file/d/19MyrDUaJ_Q9xN1y4bO9RgwZ8Uq82YV3O/view?usp=sharing" },
    { title: "Pratt & Whitney Verbal 2020", category: "verbal", company: "Pratt & Whitney", year: 2020, link: "https://drive.google.com/file/d/1Ao_2k1R85oJ16uuI9NRaa5TEreiaGDHf/view?usp=sharing" },
    { title: "Honeywell Aerospace Aptitude 2024", category: "aptitude", company: "Honeywell Aerospace", year: 2024, link: "https://drive.google.com/file/d/1Aw4buZJaxD6b3JzzONxYESd7zbJuk6I6/view?usp=sharing" },
    { title: "GE Aviation Coding 2023", category: "coding", company: "GE Aviation", year: 2023, link: "https://drive.google.com/file/d/1B0fJRL_jGOx9x0Vt0Sb82cgpzQUbGH7c/view?usp=sharing" },
    { title: "Rolls-Royce Reasoning 2022", category: "reasoning", company: "Rolls-Royce", year: 2022, link: "https://drive.google.com/file/d/1B6gbULrKOOVDNOH2Msqi_CohWWc_6KqS/view?usp=sharing" },
    { title: "Safran Verbal Ability 2021", category: "verbal", company: "Safran", year: 2021, link: "https://drive.google.com/file/d/1BCroaqPudqpyCFq-hoVdmcQ7z5zqMwjN/view?usp=sharing" },
    { title: "Thales Aptitude Test 2020", category: "aptitude", company: "Thales", year: 2020, link: "https://drive.google.com/file/d/1BQNgKYiW3U7fa1oWwk45FACPYXKfo_W9/view?usp=sharing" },
    { title: "Dassault Systèmes Coding 2024", category: "coding", company: "Dassault Systèmes", year: 2024, link: "https://drive.google.com/file/d/1BgfQKJ4vEH66KUEqHqS8uJdjC2D0aReO/view?usp=sharing" },
    { title: "Siemens Healthineers Reasoning 2023", category: "reasoning", company: "Siemens Healthineers", year: 2023, link: "https://drive.google.com/file/d/1By0BF56q96CCo8WzLgTc-87mwUk3yRMh/view?usp=sharing" },
    { title: "Medtronic Verbal Assessment 2022", category: "verbal", company: "Medtronic", year: 2022, link: "https://drive.google.com/file/d/1CBbRw-U5nh6obVoOXnPMk8-0ShgAgHGW/view?usp=sharing" },
    { title: "Johnson & Johnson Aptitude 2021", category: "aptitude", company: "Johnson & Johnson", year: 2021, link: "https://drive.google.com/file/d/1CVLOcQneqVErOUeLmlNOq72owkVTx3ce/view?usp=sharing" },
    { title: "Pfizer Coding Round 2020", category: "coding", company: "Pfizer", year: 2020, link: "https://drive.google.com/file/d/1CuKeg_hEQFNMlkiUXx_NVMVtFmwZ4x6J/view?usp=sharing" },
    { title: "Roche Reasoning Puzzles 2024", category: "reasoning", company: "Roche", year: 2024, link: "https://drive.google.com/file/d/1DCFpPE2UqseiTyH3Dr3pWPwTLT4TNmYc/view?usp=sharing" },
    { title: "Novartis Verbal Ability 2023", category: "verbal", company: "Novartis", year: 2023, link: "https://drive.google.com/file/d/1DRihSLsrnOWvoGByiK2Knho8TUnsn9Ee/view?usp=sharing" },
    { title: "Merck Aptitude Questions 2022", category: "aptitude", company: "Merck", year: 2022, link: "https://drive.google.com/file/d/1DTQp59lgcUOM87Objh7QGF3J_NIlQVXV/view?usp=sharing" },
    { title: "Bayer Coding Test 2021", category: "coding", company: "Bayer", year: 2021, link: "https://drive.google.com/file/d/1DxYbUhySkrvSgoD018TU5L6-BbES39-3/view?usp=sharing" },
    { title: "Sanofi Reasoning 2020", category: "reasoning", company: "Sanofi", year: 2020, link: "https://drive.google.com/file/d/1E_nJyNFwu5QWUqwOLClaV683f4O9NhCx/view?usp=sharing" },
    { title: "GSK Verbal Section 2024", category: "verbal", company: "GSK", year: 2024, link: "https://drive.google.com/file/d/1F7ctAKTQRK4V_siiDhskKKlyJLiNuw_j/view?usp=sharing" },
    { title: "AstraZeneca Aptitude Mock 2023", category: "aptitude", company: "AstraZeneca", year: 2023, link: "https://drive.google.com/file/d/1FAZbQo_qGg5Wuyg3u9V1sZqeLBgfAKh4/view?usp=sharing" },
    { title: "Eli Lilly Coding Interview 2022", category: "coding", company: "Eli Lilly", year: 2022, link: "https://drive.google.com/file/d/1FPtMZ9Uv1sZZeOrPrjB7QlixzoNqGBrM/view?usp=sharing" },
    { title: "Amgen Reasoning Test 2021", category: "reasoning", company: "Amgen", year: 2021, link: "https://drive.google.com/file/d/1FXbFz7m0kAfVv1l4KP3EXEwC-VmiSCs2/view?usp=sharing" },
    { title: "Gilead Sciences Verbal 2020", category: "verbal", company: "Gilead Sciences", year: 2020, link: "https://drive.google.com/file/d/1FdGc51sWPnfAQ4lCmFnmVvctztvLP_Ms/view?usp=sharing" },
    { title: "Moderna Aptitude 2024", category: "aptitude", company: "Moderna", year: 2024, link: "https://drive.google.com/file/d/1Ff6ZC5c-lvXWg3dTsncjIqrEiLFptBYb/view?usp=sharing" },
    { title: "BioNTech Coding Assessment 2023", category: "coding", company: "BioNTech", year: 2023, link: "https://drive.google.com/file/d/1Fgo3cLpkm4thzuy7t1_2DYK_iJ9fShvi/view?usp=sharing" },
    { title: "CureVac Reasoning 2022", category: "reasoning", company: "CureVac", year: 2022, link: "https://drive.google.com/file/d/1FrvgEur96B9lcIoCdBePXjchIupGnhVA/view?usp=sharing" },
    { title: "Pfizer-BioNTech Verbal 2021", category: "verbal", company: "Pfizer-BioNTech", year: 2021, link: "https://drive.google.com/file/d/1GCPobxhcGgzNrCGK-Hzpj4DdwwCQI09q/view?usp=sharing" },
    { title: "J&J Vaccine Aptitude 2020", category: "aptitude", company: "J&J Vaccine", year: 2020, link: "https://drive.google.com/file/d/1GaMwr2Uv3XplOV_H_PQoO4tnJzX2l2in/view?usp=sharing" },
    { title: "Sputnik V Coding 2024", category: "coding", company: "Sputnik V", year: 2024, link: "https://drive.google.com/file/d/1GzlpMx7lD2icchqkZAnK9sC8QR0D6z03/view?usp=sharing" },
    { title: "Covaxin Reasoning 2023", category: "reasoning", company: "Covaxin", year: 2023, link: "https://drive.google.com/file/d/1HdRTvmF_19PNTZs__8aRp7ApXQrh-0zL/view?usp=sharing" },
    { title: "Covishield Verbal 2022", category: "verbal", company: "Covishield", year: 2022, link: "https://drive.google.com/file/d/1Hy6NWkOFUhWoYkrIwG7R3gnrYMbhtIny/view?usp=sharing" },
    { title: "Bharat Biotech Aptitude 2021", category: "aptitude", company: "Bharat Biotech", year: 2021, link: "https://drive.google.com/file/d/1I32VkvsuWa0AUClV1XVMn2Go984Enrht/view?usp=sharing" },
    { title: "Serum Institute Coding 2020", category: "coding", company: "Serum Institute", year: 2020, link: "https://drive.google.com/file/d/1IFLOeeI4O-hMosqR6vrwxdxneCGqGf-e/view?usp=sharing" },
    { title: "Dr. Reddy's Reasoning 2024", category: "reasoning", company: "Dr. Reddy's", year: 2024, link: "https://drive.google.com/file/d/1IS6MvyrHA4gfdgeUlear71t3xSqrOyxo/view?usp=sharing" },
    { title: "Cipla Verbal Ability 2023", category: "verbal", company: "Cipla", year: 2023, link: "https://drive.google.com/file/d/1Is4FUClPrVf_-6Jm_gby7-FIgo7dIvrU/view?usp=sharing" },
    { title: "Sun Pharma Aptitude 2022", category: "aptitude", company: "Sun Pharma", year: 2022, link: "https://drive.google.com/file/d/1JL5PsA8PswiYyNqsgYUWkT20rL20wfv0/view?usp=sharing" },
    { title: "Lupin Coding Round 2021", category: "coding", company: "Lupin", year: 2021, link: "https://drive.google.com/file/d/1Jv0D9dRU3tYlFoLAsgR367C1mPLxJqyF/view?usp=sharing" },
    { title: "Cadila Healthcare Reasoning 2020", category: "reasoning", company: "Cadila Healthcare", year: 2020, link: "https://drive.google.com/file/d/1K-O6sRrlz5aqAw1zONPN8BuNHHkZUi1x/view?usp=sharing" },
    { title: "Glenmark Pharma Verbal 2024", category: "verbal", company: "Glenmark Pharma", year: 2024, link: "https://drive.google.com/file/d/1KGdlutqLO_5fCqCQ25JQVklueHV2j3iK/view?usp=sharing" },
    { title: "Biocon Aptitude Test 2023", category: "aptitude", company: "Biocon", year: 2023, link: "https://drive.google.com/file/d/1LTkVeGkgUp6-INJs_Ar9d3GYVqVyRr-A/view?usp=sharing" },
    { title: "Divi's Laboratories Coding 2022", category: "coding", company: "Divi's Laboratories", year: 2022, link: "https://drive.google.com/file/d/1ME2J2qFYf8umxxyPf66P7JCYyBIEfgx4/view?usp=sharing" },
    { title: "Piramal Enterprises Reasoning 2021", category: "reasoning", company: "Piramal Enterprises", year: 2021, link: "https://drive.google.com/file/d/1MGDNM1XHl_QVHYr2LzQZEKBWM9OgcQLY/view?usp=sharing" },
    { title: "Torrent Pharma Verbal 2020", category: "verbal", company: "Torrent Pharma", year: 2020, link: "https://drive.google.com/file/d/1N7qE4PPeZgWNsIk4DJRqoAUdixaCnb5D/view?usp=sharing" },
    { title: "Alkem Laboratories Aptitude 2024", category: "aptitude", company: "Alkem Laboratories", year: 2024, link: "https://drive.google.com/file/d/1Nkvd2LxPtH3H1UWuIIpqG2b7OQDc-Jny/view?usp=sharing" },
    { title: "Zydus Lifesciences Coding 2023", category: "coding", company: "Zydus Lifesciences", year: 2023, link: "https://drive.google.com/file/d/1OCzcZLT_qpI0vS1Wo93ilvJw0naXOh0u/view?usp=sharing" },
    { title: "Aurobindo Pharma Reasoning 2022", category: "reasoning", company: "Aurobindo Pharma", year: 2022, link: "https://drive.google.com/file/d/1OIOLg2-FCYzmWWRQ5p-E5FQkvZGRlvFp/view?usp=sharing" },
    { title: "Mankind Pharma Verbal Ability 2021", category: "verbal", company: "Mankind Pharma", year: 2021, link: "https://drive.google.com/file/d/1OKwN7OqiCWihI3KnxmpTmdAJrvaxbW_K/view?usp=sharing" },
    { title: "IPCA Laboratories Aptitude 2020", category: "aptitude", company: "IPCA Laboratories", year: 2020, link: "https://drive.google.com/file/d/1ORDDRqQFk8J0dM0m5IamrBjhsiY8zucH/view?usp=sharing" },
    { title: "Strides Pharma Coding 2024", category: "coding", company: "Strides Pharma", year: 2024, link: "https://drive.google.com/file/d/1OT3HpJjhU8OTIxMkymcvAiZ1iSOpfuvR/view?usp=sharing" },
    { title: "Syngene International Reasoning 2023", category: "reasoning", company: "Syngene International", year: 2023, link: "https://drive.google.com/file/d/1OfzmqdH9_Aou21-WQn1fROu02knw212W/view?usp=sharing" },
    { title: "Gland Pharma Verbal 2022", category: "verbal", company: "Gland Pharma", year: 2022, link: "https://drive.google.com/file/d/1P19WpFXIgvsLierab7Tw8vgswlp7UyxG/view?usp=sharing" },
    { title: "Laurus Labs Aptitude 2021", category: "aptitude", company: "Laurus Labs", year: 2021, link: "https://drive.google.com/file/d/1P1H7-v71w6fqe9nWi9yqoCo0-kHhcwdx/view?usp=sharing" },
    { title: "Granules India Coding 2020", category: "coding", company: "Granules India", year: 2020, link: "https://drive.google.com/file/d/1PVq0k15twCyMF9UEnak5wVYrfxYkb5dP/view?usp=sharing" },
    { title: "Ajanta Pharma Reasoning 2024", category: "reasoning", company: "Ajanta Pharma", year: 2024, link: "https://drive.google.com/file/d/1Q7LaIrBiLyunLUYoBBeye1IXEpgLMmL9/view?usp=sharing" },
    { title: "Natco Pharma Verbal 2023", category: "verbal", company: "Natco Pharma", year: 2023, link: "https://drive.google.com/file/d/1QMVl_3AXIcKPmVh8nPnpG8G7XsEgVA7S/view?usp=sharing" },
    { title: "Jubilant Pharmova Aptitude 2022", category: "aptitude", company: "Jubilant Pharmova", year: 2022, link: "https://drive.google.com/file/d/1QQ2Grb8tKF4m3SBEP2urFXnQQKOFX0cn/view?usp=sharing" },
    { title: "Wockhardt Coding 2021", category: "coding", company: "Wockhardt", year: 2021, link: "https://drive.google.com/file/d/1QTFdADEFNtRtZa08PKxhtd2IXztGon1Y/view?usp=sharing" },
    { title: "Eris Lifesciences Reasoning 2020", category: "reasoning", company: "Eris Lifesciences", year: 2020, link: "https://drive.google.com/file/d/1Qo8RnCHcWL3_1mJ8e2F2_1UiIga5zAUt/view?usp=sharing" },
    { title: "Indoco Remedies Verbal 2024", category: "verbal", company: "Indoco Remedies", year: 2024, link: "https://drive.google.com/file/d/1Qosm-33bwiUxSuJG2zaj7R1Sz1A1ISQQ/view?usp=sharing" },
    { title: "Sequent Scientific Aptitude 2023", category: "aptitude", company: "Sequent Scientific", year: 2023, link: "https://drive.google.com/file/d/1Qxvq7oAVa8hTA7ysbR4w2Vfa4mE4ATtV/view?usp=sharing" },
    { title: "Dish TV Coding 2022", category: "coding", company: "Dish TV", year: 2022, link: "https://drive.google.com/file/d/1R-pzXp80fpQ58c-EphxpIzC9aLzMmw1k/view?usp=sharing" },
    { title: "Zee Entertainment Reasoning 2021", category: "reasoning", company: "Zee Entertainment", year: 2021, link: "https://drive.google.com/file/d/1RDC9bK-Wy_mvWx1QYZi7yMEb_hPwu8vH/view?usp=sharing" },
    { title: "Sun TV Network Verbal 2020", category: "verbal", company: "Sun TV Network", year: 2020, link: "https://drive.google.com/file/d/1RPUS1taijWpeiPVehMN8zfFfZ13vgHd2/view?usp=sharing" },
    { title: "PVR Inox Aptitude 2024", category: "aptitude", company: "PVR Inox", year: 2024, link: "https://drive.google.com/file/d/1RSFFZsnsTiew2BNes6vlRJhYi4NmIqXS/view?usp=sharing" },
    { title: "Inox Leisure Coding 2023", category: "coding", company: "Inox Leisure", year: 2023, link: "https://drive.google.com/file/d/1RV104Ayj8IrKFGLrtqhd8UdEnI8wcz--/view?usp=sharing" },
    { title: "Miraj Cinemas Reasoning 2022", category: "reasoning", company: "Miraj Cinemas", year: 2022, link: "https://drive.google.com/file/d/1RxltihBNhq7cA68LWESY7dC5vzlEUXBC/view?usp=sharing" },
    { title: "Carnival Cinemas Verbal 2021", category: "verbal", company: "Carnival Cinemas", year: 2021, link: "https://drive.google.com/file/d/1SC6U3NaFTuGVc7CY65TdMNednwusCcYg/view?usp=sharing" },
    { title: "Cinepolis Aptitude 2020", category: "aptitude", company: "Cinepolis", year: 2020, link: "https://drive.google.com/file/d/1SFUZnAqIkgyFACDOzllJHjxH_luV8P7I/view?usp=sharing" },
    { title: "Mukta A2 Cinemas Coding 2024", category: "coding", company: "Mukta A2 Cinemas", year: 2024, link: "https://drive.google.com/file/d/1SQ9DyLULDbq6wemdpxhxT3UDTR_1NlZr/view?usp=sharing" },
    { title: "SRS Cinemas Reasoning 2023", category: "reasoning", company: "SRS Cinemas", year: 2023, link: "https://drive.google.com/file/d/1SwrN6Oqr7D2f-tqYYuwmlg4F93G2-Rs3/view?usp=sharing" },
    { title: "Wave Cinemas Verbal 2022", category: "verbal", company: "Wave Cinemas", year: 2022, link: "https://drive.google.com/file/d/1T8TCRMBwziXUX58Rhshzp3P_zDrYvpkR/view?usp=sharing" },
    { title: "Moviemax Aptitude 2021", category: "aptitude", company: "Moviemax", year: 2021, link: "https://drive.google.com/file/d/1THePS0VgYuU9qFyFm42StNi2oczBh7Ay/view?usp=sharing" },
    { title: "Fame Cinemas Coding 2020", category: "coding", company: "Fame Cinemas", year: 2020, link: "https://drive.google.com/file/d/1TuyqdP-bc4s5MSsPd_KDk5NgItRlyyxJ/view?usp=sharing" },
    { title: "Satyam Cineplexes Reasoning 2024", category: "reasoning", company: "Satyam Cineplexes", year: 2024, link: "https://drive.google.com/file/d/1VIPSyRLkp35iAFiMmM9ET24IHByp4Icg/view?usp=sharing" },
    { title: "Fun Cinemas Verbal 2023", category: "verbal", company: "Fun Cinemas", year: 2023, link: "https://drive.google.com/file/d/1VTGUFMmX5mOfT2lzb75QoJJmPN6vvP_O/view?usp=sharing" },
    { title: "G7 Multiplex Aptitude 2022", category: "aptitude", company: "G7 Multiplex", year: 2022, link: "https://drive.google.com/file/d/1VwyYsBmNVFHr_sx4SNX1bZOe-mq_lIn9/view?usp=sharing" },
    { title: "City Pride Cinemas Coding 2021", category: "coding", company: "City Pride Cinemas", year: 2021, link: "https://drive.google.com/file/d/1Wi2RGip1gDMhpKOIBuX-jWTQt7E5mEsf/view?usp=sharing" },
    { title: "E-Square Cinemas Reasoning 2020", category: "reasoning", company: "E-Square Cinemas", year: 2020, link: "https://drive.google.com/file/d/1Wt-K1LC8FEU-R-NN_zFaB6oOYtHjav47/view?usp=sharing" },
    { title: "Gold Cinemas Verbal 2024", category: "verbal", company: "Gold Cinemas", year: 2024, link: "https://drive.google.com/file/d/1X-cZ4ElF24OcMP1MhrfBe-AeWgR_kiZX/view?usp=sharing" },
    { title: "Rajhans Cinemas Aptitude 2023", category: "aptitude", company: "Rajhans Cinemas", year: 2023, link: "https://drive.google.com/file/d/1XLxJh814XNIeeeD-qSNya9I5ORFtI8C4/view?usp=sharing" },
    { title: "Big Cinemas Coding 2022", category: "coding", company: "Big Cinemas", year: 2022, link: "https://drive.google.com/file/d/1XiTDoXolndT4-_z3VYVblwCG7vhD0ofq/view?usp=sharing" },
    { title: "Cinemax Reasoning 2021", category: "reasoning", company: "Cinemax", year: 2021, link: "https://drive.google.com/file/d/1Xu8f93ZKiZWdhrpVF6ejFEuVgvrUKvFj/view?usp=sharing" },
    { title: "Adlabs Imagica Verbal 2020", category: "verbal", company: "Adlabs Imagica", year: 2020, link: "https://drive.google.com/file/d/1Y-ZJP19Gx3VcYQ6IaxenlnDTZauMRjHE/view?usp=sharing" },
    { title: "EsselWorld Aptitude 2024", category: "aptitude", company: "EsselWorld", year: 2024, link: "https://drive.google.com/file/d/1Y0tL0QjKSinaCKADvchyPu3fZZK8jr99/view?usp=sharing" },
    { title: "KidZania Coding 2023", category: "coding", company: "KidZania", year: 2023, link: "https://drive.google.com/file/d/1YZLbwmAWOsIrYuOHXNiMg398QpsudZvX/view?usp=sharing" },
    { title: "Imagicaaworld Reasoning 2022", category: "reasoning", company: "Imagicaaworld", year: 2022, link: "https://drive.google.com/file/d/1Y_l_7gd3vbxmtrAWeZ2Nbz88XmECOmRd/view?usp=sharing" },
    { title: "Wonderla Verbal 2021", category: "verbal", company: "Wonderla", year: 2021, link: "https://drive.google.com/file/d/1YlqkjokWggvfDPdwl0L_jwaM5Yb_mxkX/view?usp=sharing" },
    { title: "Ramoji Film City Aptitude 2020", category: "aptitude", company: "Ramoji Film City", year: 2020, link: "https://drive.google.com/file/d/1YuEvmZW-Syl45XEhsxANahsTHhycqrfy/view?usp=sharing" },
    { title: "Veegaland Coding 2024", category: "coding", company: "Veegaland", year: 2024, link: "https://drive.google.com/file/d/1Z6xmeYH7z-b3kuu-88dOvBETe-_aaieK/view?usp=sharing" },
    { title: "Appu Ghar Reasoning 2023", category: "reasoning", company: "Appu Ghar", year: 2023, link: "https://drive.google.com/file/d/1ZB7cCPSbSCJAEr01-PkrZQ-KVxFwBXoz/view?usp=sharing" },
    { title: "Nicco Park Verbal 2022", category: "verbal", company: "Nicco Park", year: 2022, link: "https://drive.google.com/file/d/1Z_97iNOP_bg_Yz6lnCRujzbNMqB9ZGp6/view?usp=sharing" },
    { title: "Worlds of Wonder Aptitude 2021", category: "aptitude", company: "Worlds of Wonder", year: 2021, link: "https://drive.google.com/file/d/1ZqUQhWmXl5cjChvNC8c8iH6FCfKrqN7o/view?usp=sharing" },
    { title: "Adventure Island Coding 2020", category: "coding", company: "Adventure Island", year: 2020, link: "https://drive.google.com/file/d/1ZwrbrRd1jTV6TWkDko_DTjkD-_uNQCQv/view?usp=sharing" },
    { title: "Kingdom of Dreams Reasoning 2024", category: "reasoning", company: "Kingdom of Dreams", year: 2024, link: "https://drive.google.com/file/d/1ZzCH0EFDhSQxVl5zLRWs8mcfoRJ1Hsuj/view?usp=sharing" },
    { title: "Snow World Verbal 2023", category: "verbal", company: "Snow World", year: 2023, link: "https://drive.google.com/file/d/1_4ia79uiTRCXY0e-RtwsnEjrNNIf-kGV/view?usp=sharing" },
    { title: "Aqua Imagica Aptitude 2022", category: "aptitude", company: "Aqua Imagica", year: 2022, link: "https://drive.google.com/file/d/1aHNLIHxqWLPM17xWfQWhGZJbGl4kzxXn/view?usp=sharing" },
    { title: "Wet N Joy Coding 2021", category: "coding", company: "Wet N Joy", year: 2021, link: "https://drive.google.com/file/d/1aWzdpPhC_8Dcj12sI8jBVLGu8eJGuFDJ/view?usp=sharing" },
    { title: "Water Kingdom Reasoning 2020", category: "reasoning", company: "Water Kingdom", year: 2020, link: "https://drive.google.com/file/d/1a_pOYL6OJac2ze2VzCfLxa5SL57XBKbG/view?usp=sharing" },
    { title: "EsselWorld Bird Park Verbal 2024", category: "verbal", company: "EsselWorld Bird Park", year: 2024, link: "https://drive.google.com/file/d/1aqAl99ApoEKyBhvYdexLxfm1H-LepfMd/view?usp=sharing" },
    { title: "Mumbai Film City Aptitude 2023", category: "aptitude", company: "Mumbai Film City", year: 2023, link: "https://drive.google.com/file/d/1b8GBuybuJ6tYLX535Ae3t7D8iLrl_xBX/view?usp=sharing" },
    { title: "Della Adventure Coding 2022", category: "coding", company: "Della Adventure", year: 2022, link: "https://drive.google.com/file/d/1bBF7_Vyi7GROjsl2GPQmZ_0U3o9ZBIWn/view?usp=sharing" },
    { title: "Imagica Water Park Reasoning 2021", category: "reasoning", company: "Imagica Water Park", year: 2021, link: "https://drive.google.com/file/d/1bQSUZgRlgLP6k8xO0etI2eE0Pv5bRxYK/view?usp=sharing" },
    { title: "Snow City Verbal 2020", category: "verbal", company: "Snow City", year: 2020, link: "https://drive.google.com/file/d/1by59x_y5bLNXFwnL644SYxzyyAvYoP2U/view?usp=sharing" },
    { title: "GRS Fantasy Park Aptitude 2024", category: "aptitude", company: "GRS Fantasy Park", year: 2024, link: "https://drive.google.com/file/d/1c-0K1aoEOryTFG-ecwFZHxXbSon1ROHh/view?usp=sharing" },
    { title: "Black Thunder Coding 2023", category: "coding", company: "Black Thunder", year: 2023, link: "https://drive.google.com/file/d/1cDz4U1yjive1-5BHJ_XWsw3LvJxf8OXB/view?usp=sharing" },
    { title: "Queens Land Reasoning 2022", category: "reasoning", company: "Queens Land", year: 2022, link: "https://drive.google.com/file/d/1ctZC4vGEOF7d0VWsxZmQrN5k6XZqpglZ/view?usp=sharing" },
    { title: "MGM Dizzee World Verbal 2021", category: "verbal", company: "MGM Dizzee World", year: 2021, link: "https://drive.google.com/file/d/1dGJ2CdBpYt1cL4pbacUoBO3xs3XNxeGf/view?usp=sharing" },
    { title: "VGP Universal Kingdom Aptitude 2020", category: "aptitude", company: "VGP Universal Kingdom", year: 2020, link: "https://drive.google.com/file/d/1dIQ7my5-OBFEqbJzYn5VQaAgetlyHqRd/view?usp=sharing" },
    { title: "Dash N Splash Coding 2024", category: "coding", company: "Dash N Splash", year: 2024, link: "https://drive.google.com/file/d/1dMdWjBrPE0SPVjeo1j6MWNLYNYF5m7nS/view?usp=sharing" },
    { title: "Kishkinta Reasoning 2023", category: "reasoning", company: "Kishkinta", year: 2023, link: "https://drive.google.com/file/d/1dNinBNHlmG97uAQwLxd5K2l8YGCmYlXM/view?usp=sharing" },
    { title: "Queensland Amusement Park Verbal 2022", category: "verbal", company: "Queensland Amusement Park", year: 2022, link: "https://drive.google.com/file/d/1dOyykPGhfOTNJWu88eLB32leHc7d8i8E/view?usp=sharing" },
    { title: "Ocean Park Aptitude 2021", category: "aptitude", company: "Ocean Park", year: 2021, link: "https://drive.google.com/file/d/1dXrkTiExvI6cUZO-jdGROv1puxOLQnkH/view?usp=sharing" },
    { title: "Worlds of Wonder Noida Coding 2020", category: "coding", company: "Worlds of Wonder Noida", year: 2020, link: "https://drive.google.com/file/d/1dgtL7B5UH3SzXZp9Gno5-a0EGAOb2LYp/view?usp=sharing" },
    { title: "Adventure Island Delhi Reasoning 2024", category: "reasoning", company: "Adventure Island Delhi", year: 2024, link: "https://drive.google.com/file/d/1f8sMaxvWjWSkrNXXd_K6pGs2JtVWUO6r/view?usp=sharing" },
    { title: "Fun N Food Village Verbal 2023", category: "verbal", company: "Fun N Food Village", year: 2023, link: "https://drive.google.com/file/d/1fd5wGcTEtuBbUfEb27m2Wtka-JdpGDD7/view?usp=sharing" },
    { title: "Oysters Beach Water Park Aptitude 2022", category: "aptitude", company: "Oysters Beach Water Park", year: 2022, link: "https://drive.google.com/file/d/1fyKq2xi9nw_y4BYAL7F7P6FCRKjXUrzX/view?usp=sharing" },
    { title: "Splash The Water Park Coding 2021", category: "coding", company: "Splash The Water Park", year: 2021, link: "https://drive.google.com/file/d/1gBYHVdWRaEvLwXvSy4VAQr6YzaSni5zy/view?usp=sharing" },
    { title: "Jurasik Park Inn Reasoning 2020", category: "reasoning", company: "Jurasik Park Inn", year: 2020, link: "https://drive.google.com/file/d/1gYeKypb6b2b21GHqqh25creWgWPcYb_U/view?usp=sharing" },
    { title: "Funanagari Verbal 2024", category: "verbal", company: "Funanagari", year: 2024, link: "https://drive.google.com/file/d/1hKhNnc2bY1TGjSCFMgpWq1edJk4l6D0f/view?usp=sharing" },
    { title: "Joygaon Aptitude 2023", category: "aptitude", company: "Joygaon", year: 2023, link: "https://drive.google.com/file/d/1hLbnk342uiBuYeMzzQSRUuGcWrCO5ZFZ/view?usp=sharing" },
    { title: "Chokhi Dhani Coding 2022", category: "coding", company: "Chokhi Dhani", year: 2022, link: "https://drive.google.com/file/d/1hS4JGzWiQ7DbuzGJ7NCRM5CEHZIqx5wZ/view?usp=sharing" },
    { title: "AapnoGhar Reasoning 2021", category: "reasoning", company: "AapnoGhar", year: 2021, link: "https://drive.google.com/file/d/1hT_4FZx9fi3dsCZJWH2gMmbXjKK6-FDh/view?usp=sharing" },
    { title: "Wet N Wild Verbal 2020", category: "verbal", company: "Wet N Wild", year: 2020, link: "https://drive.google.com/file/d/1hWyRYD-vTzl18d0oVC32GAkpAy_N9OyS/view?usp=sharing" },
    { title: "Manesar Resort Aptitude 2024", category: "aptitude", company: "Manesar Resort", year: 2024, link: "https://drive.google.com/file/d/1hhmfNt-lZeohVDfUUrM23CYDmbcNaRHS/view?usp=sharing" },
    { title: "Camp Roxx Coding 2023", category: "coding", company: "Camp Roxx", year: 2023, link: "https://drive.google.com/file/d/1j1oNhy8PLgFKI7Vfl-foeXNL3hvbHrHX/view?usp=sharing" },
    { title: "The Great Escape Water Park Reasoning 2022", category: "reasoning", company: "The Great Escape Water Park", year: 2022, link: "https://drive.google.com/file/d/1jJ6xfqC0WWt8-mWMqy2WpkLL0WOSDwUG/view?usp=sharing" },
    { title: "Tikuji-ni-Wadi Verbal 2021", category: "verbal", company: "Tikuji-ni-Wadi", year: 2021, link: "https://drive.google.com/file/d/1jdw_dikScGOFRoIjaVAnbi24zr5nwvpu/view?usp=sharing" },
    { title: "Suraj Water Park Aptitude 2020", category: "aptitude", company: "Suraj Water Park", year: 2020, link: "https://drive.google.com/file/d/1jigYykgxfAO7aAZ0rV8zJmvputKGqSSM/view?usp=sharing" },
    { title: "Adlabs Aquamagica Coding 2024", category: "coding", company: "Adlabs Aquamagica", year: 2024, link: "https://drive.google.com/file/d/1jlfpaDzxlKTSglDksahW8jc3qYgFOaqc/view?usp=sharing" },
    { title: "Imagica Theme Park Reasoning 2023", category: "reasoning", company: "Imagica Theme Park", year: 2023, link: "https://drive.google.com/file/d/1jnKJ8s_AfyuMdsRQDGInC61QYNqMpWwK/view?usp=sharing" },
    { title: "EsselWorld Gorai Verbal 2022", category: "verbal", company: "EsselWorld Gorai", year: 2022, link: "https://drive.google.com/file/d/1jybGUiixjovnbuYjcz502zHQaLWJ_jgK/view?usp=sharing" },
    { title: "Water Kingdom Mumbai Aptitude 2021", category: "aptitude", company: "Water Kingdom Mumbai", year: 2021, link: "https://drive.google.com/file/d/1k8mFuO2w-Ga4uFNC5xZbUz0XeaIEcA0-/view?usp=sharing" },
    { title: "Great Escape Water Park Coding 2020", category: "coding", company: "Great Escape Water Park", year: 2020, link: "https://drive.google.com/file/d/1kTBQpN3yFNG4qI91GE8JE9UtIgSqBvIy/view?usp=sharing" },
    { title: "Wet N Joy Water Park Reasoning 2024", category: "reasoning", company: "Wet N Joy Water Park", year: 2024, link: "https://drive.google.com/file/d/1kTWCnH0IiXt3LO7ZOFtIre1ri3ImVha4/view?usp=sharing" },
    { title: "Snow World Mumbai Verbal 2023", category: "verbal", company: "Snow World Mumbai", year: 2023, link: "https://drive.google.com/file/d/1kec4gkUKlNaRZV4bg4JW046_qI-9bmSm/view?usp=sharing" },
    { title: "GRS Fantasy Park Mysore Aptitude 2022", category: "aptitude", company: "GRS Fantasy Park Mysore", year: 2022, link: "https://drive.google.com/file/d/1kgtqTMakMVYSNv53MmnyD9IkgxEgts3P/view?usp=sharing" },
    { title: "Black Thunder Water Park Coding 2021", category: "coding", company: "Black Thunder Water Park", year: 2021, link: "https://drive.google.com/file/d/1kikFTDq5Ob_SVhQgVjdz3shcvLHHBinl/view?usp=sharing" },
    { title: "Queens Land Chennai Reasoning 2020", category: "reasoning", company: "Queens Land Chennai", year: 2020, link: "https://drive.google.com/file/d/1lvu20LM_HN9X9g3YVIhm1HMMMmIbngX3/view?usp=sharing" },
    { title: "MGM Dizzee World Chennai Verbal 2024", category: "verbal", company: "MGM Dizzee World Chennai", year: 2024, link: "https://drive.google.com/file/d/1lysFu9UorzVFEbcQK3bD1YOFHYEGvYkv/view?usp=sharing" },
    { title: "VGP Universal Kingdom Chennai Aptitude 2023", category: "aptitude", company: "VGP Universal Kingdom Chennai", year: 2023, link: "https://drive.google.com/file/d/1mIsESQPJq2GHs5Mxl5GlttqnzQivFvz8/view?usp=sharing" },
    { title: "Dash N Splash Chennai Coding 2022", category: "coding", company: "Dash N Splash Chennai", year: 2022, link: "https://drive.google.com/file/d/1nB17BAwfTLahVf_2GQqP3EGgVCfjV8FV/view?usp=sharing" },
    { title: "Kishkinta Chennai Reasoning 2021", category: "reasoning", company: "Kishkinta Chennai", year: 2021, link: "https://drive.google.com/file/d/1naZf-k4tUrttgmuW5vV45Xj6anIV7WQ3/view?usp=sharing" },
    { title: "Queensland Amusement Park Chennai Verbal 2020", category: "verbal", company: "Queensland Amusement Park Chennai", year: 2020, link: "https://drive.google.com/file/d/1neOuvrf6IrT_1JqXr_fDiQ1qmqhvxDQW/view?usp=sharing" },
    { title: "Ocean Park Hyderabad Aptitude 2024", category: "aptitude", company: "Ocean Park Hyderabad", year: 2024, link: "https://drive.google.com/file/d/1o3IK3mwunXidW3fuPv7LjRsWpd010R2L/view?usp=sharing" },
    { title: "Ramoji Film City Hyderabad Coding 2023", category: "coding", company: "Ramoji Film City Hyderabad", year: 2023, link: "https://drive.google.com/file/d/1oOoc_4GeqOAntp6pQi2BHUgla_lEbXSp/view?usp=sharing" },
    { title: "Wonderla Hyderabad Reasoning 2022", category: "reasoning", company: "Wonderla Hyderabad", year: 2022, link: "https://drive.google.com/file/d/1oTrpM-UBEshL6dUHw6ZE011qPBHFp13C/view?usp=sharing" },
    { title: "Jalavihar Water Park Verbal 2021", category: "verbal", company: "Jalavihar Water Park", year: 2021, link: "https://drive.google.com/file/d/1oUDJOh3XfrlcBb9ZwK8PIXPEjuPdUzXD/view?usp=sharing" },
    { title: "Mount Opera Aptitude 2020", category: "aptitude", company: "Mount Opera", year: 2020, link: "https://drive.google.com/file/d/1pIS-XcTwMESMX4eJXPpfkqZrbBGJhvEQ/view?usp=sharing" },
    { title: "Leonia Holistic Destination Coding 2024", category: "coding", company: "Leonia Holistic Destination", year: 2024, link: "https://drive.google.com/file/d/1pRnK1Wdd0Elu9iXEeoamSnT7I1xapAL2/view?usp=sharing" },
    { title: "Wonderla Bangalore Reasoning 2023", category: "reasoning", company: "Wonderla Bangalore", year: 2023, link: "https://drive.google.com/file/d/1qajNrrxA94b-fEDJ_BMsHUx81ULlqdZa/view?usp=sharing" },
    { title: "Innovative Film City Verbal 2022", category: "verbal", company: "Innovative Film City", year: 2022, link: "https://drive.google.com/file/d/1rAUKem4xZQvlniQZ5NW5KuIRTQVbW_wf/view?usp=sharing" },
    { title: "Snow City Bangalore Aptitude 2021", category: "aptitude", company: "Snow City Bangalore", year: 2021, link: "https://drive.google.com/file/d/1rDU0VFriZ9lNPeFx8s5BTZz9x-DJfroC/view?usp=sharing" },
    { title: "Fun World & Water Park Coding 2020", category: "coding", company: "Fun World & Water Park", year: 2020, link: "https://drive.google.com/file/d/1roBWArtJc2qkAEic_xdjsZlTj_QvKO9-/view?usp=sharing" },
    { title: "GRS Fantasy Park Bangalore Reasoning 2024", category: "reasoning", company: "GRS Fantasy Park Bangalore", year: 2024, link: "https://drive.google.com/file/d/1rpu8EDoyBwATZbvviy86E9dxoiSfBpxn/view?usp=sharing" },
    { title: "Lumbini Gardens Verbal 2023", category: "verbal", company: "Lumbini Gardens", year: 2023, link: "https://drive.google.com/file/d/1ruDJAO0y6k1yXmdy_67YuPR-f9OsLjZD/view?usp=sharing" },
    { title: "Neeladri Amusement Park Aptitude 2022", category: "aptitude", company: "Neeladri Amusement Park", year: 2022, link: "https://drive.google.com/file/d/1spMm0V3pIIgqFbN0plr_exKTbk2WfZIA/view?usp=sharing" },
    { title: "Fantasy Lagoon Water Park Coding 2021", category: "coding", company: "Fantasy Lagoon Water Park", year: 2021, link: "https://drive.google.com/file/d/1stLBCQ2nunjE0Y0Rk9bA_MxffH776yHo/view?usp=sharing" },
    { title: "Innovative Film City Bangalore Reasoning 2020", category: "reasoning", company: "Innovative Film City Bangalore", year: 2020, link: "https://drive.google.com/file/d/1tDmAW9wP9ydwAzpo8HQ69tVkRjuHaLXi/view?usp=sharing" },
    { title: "Wonderla Kochi Verbal 2024", category: "verbal", company: "Wonderla Kochi", year: 2024, link: "https://drive.google.com/file/d/1tdnkuOefo7dsZIHljFXOr049InnkFiVO/view?usp=sharing" },
    { title: "Silver Storm Water Theme Park Aptitude 2023", category: "aptitude", company: "Silver Storm Water Theme Park", year: 2023, link: "https://drive.google.com/file/d/1tf_OZU0Bxz2jORQ-CqW5oqeAXcm3xjWH/view?usp=sharing" },
    { title: "Dream World Water Park Coding 2022", category: "coding", company: "Dream World Water Park", year: 2022, link: "https://drive.google.com/file/d/1trJoNJGSXxzTZzfMMUQxobqXGKLetpme/view?usp=sharing" },
    { title: "Fantasy Park Palakkad Reasoning 2021", category: "reasoning", company: "Fantasy Park Palakkad", year: 2021, link: "https://drive.google.com/file/d/1ujTsl4wXyXFUNgXVY7Zgz57Ge9AKNsxU/view?usp=sharing" },
    { title: "Aqua World Kochi Verbal 2020", category: "verbal", company: "Aqua World Kochi", year: 2020, link: "https://drive.google.com/file/d/1uuVhMvOSTeitQL7QXAPRmtPXR3qUhVSm/view?usp=sharing" },
    { title: "Wonderla Chennai Aptitude 2024", category: "aptitude", company: "Wonderla Chennai", year: 2024, link: "https://drive.google.com/file/d/1vBk9_f3Cg0hyDM2yz8Hc0t_sRkGTSWBy/view?usp=sharing" },
    { title: "VGP Universal Kingdom Chennai Coding 2023", category: "coding", company: "VGP Universal Kingdom Chennai", year: 2023, link: "https://drive.google.com/file/d/1vEUmtAAu874mKZ8YTzBSHjHI-GZKqgbS/view?usp=sharing" },
    { title: "MGM Dizzee World Chennai Reasoning 2022", category: "reasoning", company: "MGM Dizzee World Chennai", year: 2022, link: "https://drive.google.com/file/d/1vKt1tPtRPOKZ-PgqPIDYe5FaW9fikk2c/view?usp=sharing" },
    { title: "Dash N Splash Chennai Verbal 2021", category: "verbal", company: "Dash N Splash Chennai", year: 2021, link: "https://drive.google.com/file/d/1viojieUoWK4yrCef-6O2SUjE4iodfMiB/view?usp=sharing" },
    { title: "Kishkinta Chennai Aptitude 2020", category: "aptitude", company: "Kishkinta Chennai", year: 2020, link: "https://drive.google.com/file/d/1wPOFTwk5gp9kpVl9BY20XusULgG7fC7P/view?usp=sharing" },
    { title: "Queensland Amusement Park Chennai Coding 2024", category: "coding", company: "Queensland Amusement Park Chennai", year: 2024, link: "https://drive.google.com/file/d/1wRgWLNih2mmcHXTHlPr8Eto-9odtOvqx/view?usp=sharing" },
    { title: "Ocean Park Hyderabad Reasoning 2023", category: "reasoning", company: "Ocean Park Hyderabad", year: 2023, link: "https://drive.google.com/file/d/1wfCbtSDysS_p6zFg1D7r79nQiSPO5LiV/view?usp=sharing" },
    { title: "Ramoji Film City Hyderabad Verbal 2022", category: "verbal", company: "Ramoji Film City Hyderabad", year: 2022, link: "https://drive.google.com/file/d/1wfzRb9u79VxtRG-H78l3uJMTOPXMKwzq/view?usp=sharing" },
    { title: "Wonderla Hyderabad Aptitude 2021", category: "aptitude", company: "Wonderla Hyderabad", year: 2021, link: "https://drive.google.com/file/d/1x-1vW4tc6lMyHx4gXDEXihIlTw2iOtJh/view?usp=sharing" },
    { title: "Jalavihar Water Park Hyderabad Coding 2020", category: "coding", company: "Jalavihar Water Park Hyderabad", year: 2020, link: "https://drive.google.com/file/d/1x9s7Rjy2Uh9CNLXcwdJ0ARPyFTgyvRmm/view?usp=sharing" },
    { title: "Mount Opera Hyderabad Reasoning 2024", category: "reasoning", company: "Mount Opera Hyderabad", year: 2024, link: "https://drive.google.com/file/d/1xKeMS4Ze0lqJk6aVZUE9KiQyvCx0iGmt/view?usp=sharing" },
    { title: "Leonia Holistic Destination Hyderabad Verbal 2023", category: "verbal", company: "Leonia Holistic Destination Hyderabad", year: 2023, link: "https://drive.google.com/file/d/1y7_ympu0zwLI7gmWa8DjdFDt3M07q-Hq/view?usp=sharing" },
    { title: "Wonderla Bangalore Aptitude 2022", category: "aptitude", company: "Wonderla Bangalore", year: 2022, link: "https://drive.google.com/file/d/1yMOPlEr34cgrylmA4BMW6AewLz0d2Tk2/view?usp=sharing" },
    { title: "Innovative Film City Bangalore Coding 2021", category: "coding", company: "Innovative Film City Bangalore", year: 2021, link: "https://drive.google.com/file/d/1yUCFjO9XTEWy3nykA4O-lp4oFmzRO783/view?usp=sharing" },
    { title: "Snow City Bangalore Reasoning 2020", category: "reasoning", company: "Snow City Bangalore", year: 2020, link: "https://drive.google.com/file/d/1ybPPfXUoxYmwALiuTvfbki7MEk5V361G/view?usp=sharing" },
    { title: "Fun World & Water Park Bangalore Verbal 2024", category: "verbal", company: "Fun World & Water Park Bangalore", year: 2024, link: "https://drive.google.com/file/d/1ydyKz_hcoYie52MO_FTAtC8YCXsOQovQ/view?usp=sharing" },
    { title: "GRS Fantasy Park Bangalore Aptitude 2023", category: "aptitude", company: "GRS Fantasy Park Bangalore", year: 2023, link: "https://drive.google.com/file/d/1zHazHjZV_Uvi_JUi8qjEMnQMw8Nwj9fJ/view?usp=sharing" },
    { title: "Lumbini Gardens Bangalore Coding 2022", category: "coding", company: "Lumbini Gardens Bangalore", year: 2022, link: "https://drive.google.com/file/d/1zKhzlCjhaaxD6sxOZ89xalbDDfyye4Rt/view?usp=sharing" },
    { title: "Neeladri Amusement Park Bangalore Reasoning 2021", category: "reasoning", company: "Neeladri Amusement Park Bangalore", year: 2021, link: "https://drive.google.com/file/d/1zMMss2cxAU0o28XidFFDSsLI6Vcceu6j/view?usp=sharing" }
];

// Get references to DOM elements
const paperListContainer = document.getElementById('paperList');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const pageNumbersContainer = document.getElementById('pageNumbers');
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');

// Pagination variables
let currentPage = 1;
const papersPerPage = 10; // Number of papers to display per page. You can adjust this value.

/**
 * Displays a given array of papers on the page, handling pagination.
 * It clears existing content and renders new paper cards.
 * @param {Array<Object>} papersToDisplay - The array of paper objects to render.
 */
function displayPapers(papersToDisplay) {
    // Clear the current content of the paper list container to avoid duplicates
    paperListContainer.innerHTML = '';

    // Calculate the start and end index for the papers on the current page
    const startIndex = (currentPage - 1) * papersPerPage;
    const endIndex = startIndex + papersPerPage;
    // Get only the papers relevant to the current page
    const paginatedPapers = papersToDisplay.slice(startIndex, endIndex);

    // If no papers are found after filtering/searching, display a "no results" message
    if (paginatedPapers.length === 0) {
        paperListContainer.innerHTML = '<p class="no-results">No papers found matching your criteria.</p>';
        return; // Exit the function if no papers to display
    }

    // Iterate over the paginated papers and create a card (div) for each
    paginatedPapers.forEach(paper => {
        const paperCard = document.createElement('div');
        // Add 'paper-card' class for general styling and the paper's category for specific filtering styles
        paperCard.classList.add('paper-card', paper.category);

        // Populate the card's inner HTML with paper details
        // The 'target="_blank"' attribute ensures the PDF opens in a new tab
        paperCard.innerHTML = `
            <h3>${paper.title}</h3>
            <p><strong>Company:</strong> ${paper.company}</p>
            <p><strong>Year:</strong> ${paper.year}</p>
            <p><strong>Category:</strong> <span class="category-tag">${paper.category.charAt(0).toUpperCase() + paper.category.slice(1)}</span></p>
            <a href="${paper.link}" target="_blank" class="btn download-btn">
                <i class="fas fa-download"></i> View Paper
            </a>
        `;
        // Append the newly created paper card to the main paper list container
        paperListContainer.appendChild(paperCard);
    });
}

/**
 * Updates the pagination buttons (page numbers, prev/next) based on the
 * total number of papers available after filtering and searching.
 * @param {Array<Object>} filteredPapers - The array of papers after applying filters and search.
 */
function updatePagination(filteredPapers) {
    // Calculate the total number of pages required
    const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
    // Clear any existing page number buttons
    pageNumbersContainer.innerHTML = '';

    // Create a button for each page
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('page-btn');
        // Mark the current page button as active for styling
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.dataset.page = i; // Store the page number as a data attribute
        pageBtn.textContent = i; // Set the button's text to the page number
        // Add a click event listener to each page button
        pageBtn.addEventListener('click', () => {
            currentPage = i; // Update the current page
            filterAndSortPapers(); // Re-run the main function to update the display
        });
        pageNumbersContainer.appendChild(pageBtn); // Add the page button to the pagination container
    }

    // Disable the 'Previous' button if on the first page
    prevPageBtn.disabled = currentPage === 1;
    // Disable the 'Next' button if on the last page or if there are no pages
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

/**
 * This is the main function that orchestrates the filtering, sorting,
 * and displaying of papers. It's called whenever a search, filter, or sort
 * action occurs, or on initial page load.
 */
function filterAndSortPapers() {
    // Start with a shallow copy of the original papers array to perform operations on
    // without modifying the original data source.
    let filtered = [...previousPapers];

    // --- Apply Search Filter ---
    const searchTerm = searchInput.value.toLowerCase().trim(); // Get and clean the search input
    if (searchTerm) {
        // Filter papers where title, company, category, or year includes the search term
        filtered = filtered.filter(paper =>
            paper.title.toLowerCase().includes(searchTerm) ||
            paper.company.toLowerCase().includes(searchTerm) ||
            paper.category.toLowerCase().includes(searchTerm) ||
            String(paper.year).includes(searchTerm) // Convert year to string for consistent searching
        );
    }

    // --- Apply Category Filter ---
    // Find the currently active category filter button
    const activeFilter = document.querySelector('.filter-btn.active');
    // If an active filter exists and it's not the 'all' filter, apply the category filter
    if (activeFilter && activeFilter.dataset.filter !== 'all') {
        filtered = filtered.filter(paper => paper.category === activeFilter.dataset.filter);
    }

    // --- Apply Sorting ---
    const sortBy = sortSelect.value; // Get the selected sorting option from the dropdown
    switch (sortBy) {
        case 'newest':
            // Sort by year in descending order (e.g., 2024, 2023, ...)
            filtered.sort((a, b) => b.year - a.year);
            break;
        case 'oldest':
            // Sort by year in ascending order (e.g., 2020, 2021, ...)
            filtered.sort((a, b) => a.year - b.year);
            break;
        case 'title-asc':
            // Sort by title alphabetically in ascending order (A-Z)
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            // Sort by title alphabetically in descending order (Z-A)
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }

    // After filtering and sorting, display the papers for the current page
    displayPapers(filtered);
    // And update the pagination controls based on the new set of filtered papers
    updatePagination(filtered);
}

// --- Event Listeners ---

// Event listener for the search form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)
    currentPage = 1; // Reset to the first page when a new search is performed
    filterAndSortPapers(); // Re-run the main function to apply the new search
});

// Event listeners for category filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        button.classList.add('active');
        currentPage = 1; // Reset to the first page when a new filter is applied
        filterAndSortPapers(); // Re-run the main function to apply the new filter
    });
});

// Event listener for changes in the sort dropdown
sortSelect.addEventListener('change', () => {
    currentPage = 1; // Reset to the first page when sorting changes
    filterAndSortPapers(); // Re-run the main function to apply the new sort order
});

// Event listener for the 'Previous Page' button
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) { // Only go back if not already on the first page
        currentPage--; // Decrement the current page number
        filterAndSortPapers(); // Update the display for the previous page
    }
});

// Event listener for the 'Next Page' button
nextPageBtn.addEventListener('click', () => {
    // To correctly determine if there's a next page, we need to know the total pages
    // based on the *currently filtered* set of papers.
    let currentFilteredPapers = [...previousPapers];
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        currentFilteredPapers = currentFilteredPapers.filter(paper =>
            paper.title.toLowerCase().includes(searchTerm) ||
            paper.company.toLowerCase().includes(searchTerm) ||
            paper.category.toLowerCase().includes(searchTerm) ||
            String(paper.year).includes(searchTerm)
        );
    }
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter && activeFilter.dataset.filter !== 'all') {
        currentFilteredPapers = currentFilteredPapers.filter(paper => paper.category === activeFilter.dataset.filter);
    }
    const totalPages = Math.ceil(currentFilteredPapers.length / papersPerPage);

    if (currentPage < totalPages) { // Only go forward if not already on the last page
        currentPage++; // Increment the current page number
        filterAndSortPapers(); // Update the display for the next page
    }
});

// --- Initial Load ---
// This ensures that the script runs only after the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    filterAndSortPapers(); // Call the main function to initially display all papers and set up pagination
});