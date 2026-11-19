/* Initial data - exported from the original SQL FIle/tms.sql */
window.TMS_SEED = {
 "admin": [
  {
   "id": 1,
   "UserName": "admin",
   "Name": "Administrator",
   "EmailId": "test@gmail.com",
   "MobileNumber": 7894561239,
   "Password": "f925916e2754e5e03f75dd58a5733251",
   "updationDate": "2025-10-09 11:18:49"
  }
 ],
 "tblbooking": [
  {
   "BookingId": 1,
   "PackageId": 2,
   "UserEmail": "garima12@gmail.com",
   "FromDate": "2025-11-20",
   "ToDate": "2025-11-25",
   "Comment": "NA",
   "RegDate": "2025-11-04 18:02:10",
   "status": 1,
   "CancelledBy": null,
   "UpdationDate": "2025-11-05 06:25:07"
  },
  {
   "BookingId": 2,
   "PackageId": 4,
   "UserEmail": "test@gmail.com",
   "FromDate": "2025-12-01",
   "ToDate": "2025-12-05",
   "Comment": "Hello",
   "RegDate": "2025-11-04 18:02:58",
   "status": 1,
   "CancelledBy": null,
   "UpdationDate": "2025-11-05 06:25:04"
  },
  {
   "BookingId": 3,
   "PackageId": 9,
   "UserEmail": "test@gmail.com",
   "FromDate": "2025-12-20",
   "ToDate": "2025-12-25",
   "Comment": "NA",
   "RegDate": "2025-11-04 18:03:26",
   "status": 0,
   "CancelledBy": null,
   "UpdationDate": null
  }
 ],
 "tblenquiry": [
  {
   "id": 1,
   "FullName": "Rahul",
   "EmailId": "rahul12@gmail.com",
   "MobileNumber": "1234567890",
   "Subject": "Regarding Booking",
   "Description": "I want to know the booking process",
   "PostingDate": "2025-11-05 06:52:11",
   "Status": null
  },
  {
   "id": 2,
   "FullName": "John Doe",
   "EmailId": "jon12@t.com",
   "MobileNumber": "1234567890",
   "Subject": "Refund",
   "Description": "I want to kown the booking status",
   "PostingDate": "2025-11-05 06:52:45",
   "Status": 1
  }
 ],
 "tblissues": [
  {
   "id": 1,
   "UserEmail": "test@gmail.com",
   "Issue": "Booking Issues",
   "Description": "I need some help regarding book",
   "PostingDate": "2025-11-05 06:31:50",
   "AdminRemark": "Issue resolved",
   "AdminremarkDate": "2025-11-05 06:35:25"
  },
  {
   "id": 2,
   "UserEmail": "test@gmail.com",
   "Issue": "Other",
   "Description": "I want to know the refund process.",
   "PostingDate": "2025-11-05 06:35:52",
   "AdminRemark": "Details shared with the user",
   "AdminremarkDate": "2025-11-05 06:36:07"
  }
 ],
 "tblpages": [
  {
   "id": 1,
   "type": "terms",
   "detail": "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p align=\"justify\"><span style=\"color: rgb(153, 0, 0); font-size: small; font-weight: 700;\">terms and condition page</span></p>\r\n\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t"
  },
  {
   "id": 2,
   "type": "privacy",
   "detail": "\t\t\t\t\t\t\t\t\t\t<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</span>\r\n\t\t\t\t\t\t\t\t\t\t"
  },
  {
   "id": 3,
   "type": "aboutus",
   "detail": "\t\t\t\t\t\t\t\t\t\t<div><span style=\"color: rgb(0, 0, 0); font-family: Georgia; font-size: 15px; text-align: justify; font-weight: bold;\">Welcome to Tourism Management System!!!</span></div><span style=\"font-family: &quot;courier new&quot;;\"><span style=\"color: rgb(0, 0, 0); font-size: 15px; text-align: justify;\">Since then, our courteous and committed team members have always ensured a pleasant and enjoyable tour for the clients. This arduous effort has enabled TMS to be recognized as a dependable Travel Solutions provider with three offices Delhi.</span><span style=\"color: rgb(80, 80, 80); font-size: 13px;\">&nbsp;We have got packages to suit the discerning traveler's budget and savor. Book your dream vacation online. Supported quality and proposals of our travel consultants, we have a tendency to welcome you to decide on from holidays packages and customize them according to your plan.</span></span>\r\n\t\t\t\t\t\t\t\t\t\t"
  },
  {
   "id": 11,
   "type": "contact",
   "detail": "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; font-size: 14px; text-align: justify;\">Address------J-890 Dwarka House New Delhi-110096</span>"
  }
 ],
 "tbltourpackages": [
  {
   "PackageId": 1,
   "PackageName": "Swiss Paris Delight Premium 2020 (Group Package)",
   "PackageType": "Group Package",
   "PackageLocation": "Paris and Switzerland",
   "PackagePrice": 60000,
   "PackageFetures": " Round trip Economy class airfare valid for the duration of the holiday - Airport taxes - Accommodation for 3 nights in Paris and 3 nights in scenic Switzerland - Enjoy continental breakfasts every morning - Enjoy 5 Indian dinners in Mainland Europe - Exp",
   "PackageDetails": "Pick this holiday for a relaxing vacation in Paris and Switzerland. Your tour embarks from Paris. Enjoy an excursion to popular attractions like the iconic Eiffel Tower. After experiencing the beautiful city, you will drive past mustard fields through Burgundy to reach Switzerland. While there, you can opt for a tour to Interlaken and then to the Trummelbach Falls. Photostop at Zurich Lake and a cable car ride to Mt. Titlis are the main highlights of the holiday.",
   "PackageImage": "1581490262_2_1.jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:02:50"
  },
  {
   "PackageId": 2,
   "PackageName": "Bhutan Holidays - Thimphu and Paro Special",
   "PackageType": "Family Package",
   "PackageLocation": "Bhutan",
   "PackagePrice": 30000,
   "PackageFetures": "Free Wi-fi, Free Breakfast, Free Pickup and drop facility ",
   "PackageDetails": "Visit to Tiger's Nest Monastery | Complimentary services of a Professional Guide",
   "PackageImage": "BHUTAN-THIMPU-PARO-PUNAKHA-TOUR-6N-7D.jpeg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:02:59"
  },
  {
   "PackageId": 3,
   "PackageName": "Soulmate Special Bali - 7 Nights",
   "PackageType": "Couple Package",
   "PackageLocation": "Indonesia(Bali)",
   "PackagePrice": 50000,
   "PackageFetures": "Free Pickup and drop facility, Free Wi-fi , Free professional guide",
   "PackageDetails": "Airport transfers by private car | Popular Sightseeing included | Suitable for Couple and budget travelers",
   "PackageImage": "1583140977_5_11.jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:03:01"
  },
  {
   "PackageId": 4,
   "PackageName": "Kerala - A Lovers Paradise - Value Added",
   "PackageType": "Family Package",
   "PackageLocation": "Kerala",
   "PackagePrice": 100000,
   "PackageFetures": "Free Wi-fi, Free pick up and drop facility,",
   "PackageDetails": "Visit Matupetty Dam, tea plantation and a spice garden | View sunset in Kanyakumari | AC Car at disposal for 2hrs extra (once per city)",
   "PackageImage": "images (2).jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:03:03"
  },
  {
   "PackageId": 5,
   "PackageName": "Short Trip To Dubai",
   "PackageType": "Family",
   "PackageLocation": "Dubai",
   "PackagePrice": 45000,
   "PackageFetures": "Free pick up and drop facility, Free Wi-fi, Free breakfast",
   "PackageDetails": "A Holiday Package for the entire family.",
   "PackageImage": "unnamed.jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:03:06"
  },
  {
   "PackageId": 6,
   "PackageName": "Sikkim Delight with Darjeeling (customizable)",
   "PackageType": "Group",
   "PackageLocation": "Sikkim",
   "PackagePrice": 35000,
   "PackageFetures": "Free Breakfast, Free Pick up drop facility",
   "PackageDetails": "Changu Lake and New Baba Mandir excursion | View the sunrise from Tiger Hill | Get Blessed at the famous Rumtek Monastery",
   "PackageImage": "download (2).jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:03:08"
  },
  {
   "PackageId": 7,
   "PackageName": "6 Days in Guwahati and Shillong With Cherrapunji Excursion",
   "PackageType": "Family Package",
   "PackageLocation": "Guwahati(Sikkim)",
   "PackagePrice": 45000,
   "PackageFetures": "Breakfast,  Accommodation » Pick-up » Drop » Sightseeing",
   "PackageDetails": "After arrival at Guwahati airport meet our representative & proceed for Shillong. Shillong is the capital and hill station of Meghalaya, also known as Abode of Cloud, one of the smallest states in India. En route visit Barapani lake. By afternoon reach at Shillong. Check in to the hotel. Evening is leisure. Spent time as you want. Visit Police bazar. Overnight stay at Shillong.",
   "PackageImage": "95995.jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:03:11"
  },
  {
   "PackageId": 8,
   "PackageName": "Grand Week in North East - Lachung, Lachen and Gangtok",
   "PackageType": "Domestic Packages",
   "PackageLocation": "Sikkim",
   "PackagePrice": 45000,
   "PackageFetures": "Free Breakfast, Free Wi-fi",
   "PackageDetails": "Changu Lakeand New Baba Mandir excursion | Yumthang Valley tour | Gurudongmar Lake excursion | Night stay in Lachen",
   "PackageImage": "download (3).jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:03:13"
  },
  {
   "PackageId": 9,
   "PackageName": "Gangtok & Darjeeling Holiday (Without Flights)",
   "PackageType": "Family Package",
   "PackageLocation": "Sikkim",
   "PackagePrice": 100000,
   "PackageFetures": "Free Wi-fi, Free pickup and drop facility",
   "PackageDetails": "Ideal tour for Family | Sightseeing in Gangtok and Darjeeling | Full day excursion to idyllic Changu Lake | Visit to Ghoom Monastery",
   "PackageImage": "1540382781_shutterstock_661867435.jpg.jpg",
   "Creationdate": "2025-10-18 05:21:58",
   "UpdationDate": "2025-11-05 06:03:15"
  }
 ],
 "tblusers": [
  {
   "id": 1,
   "FullName": "Manju Srivatav",
   "MobileNumber": "4456464654",
   "EmailId": "manju@gmail.com",
   "Password": "202cb962ac59075b964b07152d234b70",
   "RegDate": "2025-10-10 06:33:20",
   "UpdationDate": "2025-11-04 17:59:41"
  },
  {
   "id": 2,
   "FullName": "Kishan",
   "MobileNumber": "9871987979",
   "EmailId": "kishan@gmail.com",
   "Password": "202cb962ac59075b964b07152d234b70",
   "RegDate": "2025-10-10 06:33:20",
   "UpdationDate": "2025-11-04 17:59:49"
  },
  {
   "id": 3,
   "FullName": "Salvi Chandra",
   "MobileNumber": "1398756416",
   "EmailId": "salvi@gmail.com",
   "Password": "202cb962ac59075b964b07152d234b70",
   "RegDate": "2025-10-10 06:33:20",
   "UpdationDate": "2025-11-04 17:59:49"
  },
  {
   "id": 4,
   "FullName": "Abir",
   "MobileNumber": "4789756456",
   "EmailId": "abir@gmail.com",
   "Password": "202cb962ac59075b964b07152d234b70",
   "RegDate": "2025-10-10 06:33:20",
   "UpdationDate": "2025-11-04 17:59:49"
  },
  {
   "id": 5,
   "FullName": "Test",
   "MobileNumber": "1987894654",
   "EmailId": "test@gmail.com",
   "Password": "f925916e2754e5e03f75dd58a5733251",
   "RegDate": "2025-10-10 06:33:20",
   "UpdationDate": "2025-11-04 17:59:49"
  },
  {
   "id": 9,
   "FullName": "Test Sample",
   "MobileNumber": "4654654564",
   "EmailId": "testsample@gmail.com",
   "Password": "202cb962ac59075b964b07152d234b70",
   "RegDate": "2025-10-10 06:33:20",
   "UpdationDate": "2025-11-04 17:59:49"
  },
  {
   "id": 10,
   "FullName": "Garima Singh",
   "MobileNumber": "1425362540",
   "EmailId": "garima12@gmail.com",
   "Password": "f925916e2754e5e03f75dd58a5733251",
   "RegDate": "2025-10-10 06:33:20",
   "UpdationDate": "2025-11-04 17:59:49"
  }
 ]
};
