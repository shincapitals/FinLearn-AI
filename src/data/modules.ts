export interface Module {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  companyExample: string;
  sections: {
    theory: string;
    deepDive: string;
    exercise: string;
    quiz: QuizQuestion[];
    project: string;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const MODULES: Module[] = [
  {
    id: 1,
    title: "Báo Cáo Kết Quả Kinh Doanh (Income Statement)",
    shortTitle: "Income Statement",
    description: "Tìm hiểu về Doanh thu, Giá vốn hàng bán, Lợi nhuận gộp và Lợi nhuận ròng.",
    companyExample: "Apple Inc. (AAPL)",
    sections: {
      theory: "### 1. Doanh thu và Lợi nhuận là gì?\nBáo cáo kết quả kinh doanh (Income Statement) giống như một cuốn sổ thu chi của công ty, cho biết trong một khoảng thời gian (quý hoặc năm), công ty đã kiếm được bao nhiêu và tiêu bao nhiêu.\n\n**Các khái niệm then chốt:**\n- **Doanh thu (Revenue):** Tổng số tiền thu về từ việc bán hàng/dịch vụ. Chưa trừ bất kỳ chi phí nào.\n- **Giá vốn hàng bán (COGS):** Chi phí trực tiếp để tạo ra sản phẩm (nguyên vật liệu, nhân công trực tiếp).\n- **Lợi nhuận gộp (Gross Profit):** Doanh thu - Giá vốn. Cho biết hiệu quả sản xuất.\n- **Lợi nhuận ròng (Net Income):** 'Con số cuối cùng' sau khi trừ hết tất cả chi phí, thuế và lãi vay.\n\n**Phân tích sâu về Chất lượng lợi nhuận:**\nMột công ty có lợi nhuận cao chưa chắc đã tốt nếu lợi nhuận đó đến từ các hoạt động bất thường (bán tài sản, hoàn nhập dự phòng) thay vì hoạt động kinh doanh cốt lõi. Hãy luôn kiểm tra xem lợi nhuận có đi kèm với dòng tiền thực tế hay không.\n\n**Ví dụ thực tế (Dữ liệu 2024):**\n- **Apple (AAPL):** Trong năm tài chính 2024, Apple đạt doanh thu khoảng **391 tỷ USD** và lợi nhuận ròng khoảng **93 tỷ USD**. Biên lợi nhuận ròng duy trì ở mức cực cao (~24%), cho thấy khả năng kiểm soát chi phí và sức mạnh thương hiệu tuyệt vời.\n- **Vinamilk (VNM):** Năm 2024, Vinamilk ghi nhận doanh thu hơn **60.000 tỷ VNĐ** và lợi nhuận ròng khoảng **9.000 tỷ VNĐ**. Mặc dù giá nguyên liệu sữa bột biến động, Vinamilk vẫn duy trì biên lợi nhuận gộp ổn định nhờ quy mô lớn và chuỗi cung ứng tự chủ.\n\n**Tích hợp ESG (Mới):**\n- **Apple (AAPL):** Apple cam kết trung hòa carbon vào năm 2030. Việc đầu tư vào năng lượng tái tạo và vật liệu tái chế không chỉ là trách nhiệm xã hội mà còn giúp giảm rủi ro pháp lý và tăng hiệu quả vận hành dài hạn. Các nhà đầu tư hiện đại coi ESG là một phần không thể thiếu khi đánh giá giá trị doanh nghiệp. *Dữ liệu ESG mới nhất sẽ được hiển thị bên dưới.*",
      deepDive: "### Phân tích Biên lợi nhuận theo ngành\n- **Ngành Công nghệ (VD: Apple, Microsoft):** Thường có biên lợi nhuận gộp rất cao (40-60%) nhờ sở hữu trí tuệ và thương hiệu mạnh.\n- **Ngành Bán lẻ (VD: Walmart, Thế Giới Di Động):** Biên lợi nhuận gộp thường thấp (15-25%) nhưng bù lại bằng khối lượng bán hàng cực lớn.\n- **Ngành Sản xuất (VD: Hòa Phát):** Phụ thuộc lớn vào giá nguyên liệu đầu vào và quy mô sản xuất.\n\n**So sánh thực tế:** Biên lợi nhuận ròng của Apple thường duy trì trên 20%, trong khi các hãng bán lẻ như Walmart chỉ khoảng 2-3%.",
      exercise: "### Bài tập thực hành: Tra cứu và phân tích\n1. Sử dụng công cụ tra cứu bên phải để tìm dữ liệu tài chính mới nhất của **Apple (AAPL)**.\n2. Ghi lại con số Doanh thu và Lợi nhuận ròng.\n3. Tính biên lợi nhuận ròng: `(Lợi nhuận ròng / Doanh thu) * 100%`.\n4. So sánh con số này với biên lợi nhuận ròng của **Samsung** (tra cứu thêm nếu cần).",
      quiz: [
        {
          question: "Biên lợi nhuận gộp được tính như thế nào?",
          options: ["(Doanh thu - Giá vốn) / Doanh thu", "Lợi nhuận ròng / Doanh thu", "Doanh thu / Tổng tài sản", "Lợi nhuận gộp / Tổng nợ"],
          correctIndex: 0,
          explanation: "Biên lợi nhuận gộp = (Doanh thu thuần - Giá vốn hàng bán) / Doanh thu thuần."
        },
        {
          question: "Tình huống: Nếu doanh thu của công ty tăng 20% nhưng lợi nhuận ròng lại giảm 5%, điều gì có thể đang xảy ra?",
          options: ["Công ty đang quản lý chi phí cực tốt", "Chi phí vận hành hoặc giá vốn tăng nhanh hơn doanh thu", "Công ty vừa tăng giá bán sản phẩm", "Thuế thu nhập doanh nghiệp vừa được giảm"],
          correctIndex: 1,
          explanation: "Khi doanh thu tăng mà lợi nhuận giảm, chứng tỏ chi phí (giá vốn, quản lý, bán hàng...) đang tăng quá nhanh, ăn mòn hết phần doanh thu tăng thêm."
        },
        {
          question: "Tình huống: Một công ty công nghệ có biên lợi nhuận gộp giảm từ 50% xuống 40% trong khi doanh thu vẫn tăng. Bạn nhận định thế nào?",
          options: ["Công ty đang mở rộng thị trường rất tốt", "Lợi thế cạnh tranh có thể đang suy yếu hoặc chi phí sản xuất tăng mạnh", "Công ty đang tiết kiệm chi phí", "Không có gì đáng lo ngại"],
          correctIndex: 1,
          explanation: "Biên lợi nhuận gộp giảm là dấu hiệu cảnh báo về việc mất quyền kiểm soát chi phí hoặc phải giảm giá bán để cạnh tranh."
        }
      ],
      project: "### Project: Phân tích xu hướng Vinamilk (VNM)\n**Mục tiêu:** Đánh giá sự tăng trưởng và hiệu quả kinh doanh của VNM trong 3 năm qua.\n\n**Các bước thực hiện:**\n1. **Thu thập:** Tra cứu Doanh thu và Lợi nhuận ròng của VNM trong 3 năm gần nhất (2022-2024).\n2. **Tính toán:** Tính Biên lợi nhuận ròng hàng năm: `(Lợi nhuận ròng / Doanh thu) * 100%`.\n3. **Nhận xét:** Doanh thu đang tăng hay giảm? Biên lợi nhuận có được cải thiện không?\n\n**Gợi ý:** Sử dụng công cụ tra cứu bên phải. Nếu biên lợi nhuận giảm trong khi doanh thu tăng, hãy đặt câu hỏi: 'Chi phí nào đang tăng mạnh?'"
    }
  },
  {
    id: 2,
    title: "Bảng Cân Đối Kế Toán (Balance Sheet)",
    shortTitle: "Balance Sheet",
    description: "Tài sản, Nợ phải trả và Vốn chủ sở hữu. Công thức: Tài sản = Nợ + Vốn CSH.",
    companyExample: "Microsoft (MSFT)",
    sections: {
      theory: "### 2. Tài sản, Nợ và Vốn chủ sở hữu\nBảng cân đối kế toán (Balance Sheet) giống như một bức ảnh chụp nhanh tình trạng tài chính của công ty tại một thời điểm nhất định.\n\n**Các thành phần chính:**\n- **Tài sản (Assets):** Những gì công ty sở hữu (Tiền mặt, Hàng tồn kho, Nhà máy, Thương hiệu).\n- **Nợ phải trả (Liabilities):** Những gì công ty nợ (Vay ngân hàng, Nợ nhà cung cấp).\n- **Vốn chủ sở hữu (Equity):** Phần còn lại thuộc về chủ sở hữu sau khi trả hết nợ.\n\n**Cơ cấu tài sản và Đòn bẩy:**\nMột công ty có nhiều tài sản cố định (nhà máy, máy móc) thường có chi phí cố định cao, rủi ro hơn khi thị trường đi xuống nhưng lại có lợi thế quy mô khi thị trường tốt. Đòn bẩy tài chính (sử dụng nợ) có thể giúp tăng ROE nhưng cũng làm tăng rủi ro phá sản nếu không quản lý tốt dòng tiền.\n\n**Ví dụ thực tế (Dữ liệu 2024):**\n- **Microsoft (MSFT):** Microsoft sở hữu bảng cân đối kế toán cực kỳ lành mạnh với hơn **80 tỷ USD** tiền mặt và các khoản đầu tư ngắn hạn. Tổng tài sản đạt gần **450 tỷ USD**, trong khi nợ vay dài hạn chỉ chiếm một phần nhỏ, giúp họ có nguồn lực khổng lồ để thâu tóm các công ty AI.\n- **Hòa Phát (HPG):** Năm 2024, Hòa Phát tiếp tục đầu tư mạnh vào dự án Dung Quất 2. Tổng tài sản đạt khoảng **190.000 tỷ VNĐ**. Việc sử dụng nợ vay để tài trợ cho dự án này là một chiến lược đòn bẩy điển hình trong ngành sản xuất thép, đòi hỏi sự cân đối kỹ lưỡng giữa nợ và vốn chủ sở hữu.\n\n*Hãy xem dữ liệu thực tế bên dưới để biết cấu trúc tài sản của Microsoft hiện tại.*",
      deepDive: "### Cấu trúc vốn theo ngành\n- **Ngành Ngân hàng (VD: Vietcombank, JPMorgan):** Đặc thù là nợ phải trả rất lớn (tiền gửi của khách hàng) so với vốn chủ sở hữu. Tỷ lệ đòn bẩy thường rất cao.\n- **Ngành Bất động sản (VD: Vinhomes):** Thường có nợ vay lớn để tài trợ cho các dự án dài hạn. Khả năng thanh toán phụ thuộc vào tiến độ bán hàng.\n- **Ngành Công nghệ:** Thường có cấu trúc vốn 'nhẹ' (Asset-light), ít nợ vay và nhiều tiền mặt.\n\n**Phân tích rủi ro:** Một công ty BĐS có tỷ lệ Nợ/Vốn CSH > 2 lần thường được coi là rủi ro cao nếu thị trường đóng băng.",
      exercise: "### Bài tập thực hành: Đánh giá sức khỏe tài chính\n1. Tra cứu Bảng cân đối kế toán mới nhất của **Hòa Phát (HPG)**.\n2. Xác định tổng Nợ phải trả và Vốn chủ sở hữu.\n3. Tính tỷ lệ Nợ/Vốn chủ sở hữu (D/E ratio).\n4. Dựa trên lý thuyết, bạn đánh giá mức độ rủi ro tài chính của HPG hiện tại như thế nào?",
      quiz: [
        {
          question: "Tình huống: Một công ty bất động sản có tỷ lệ Nợ/Vốn chủ sở hữu (D/E) tăng cao từ 1.5 lên 3.5 trong 1 năm. Biện pháp nào giúp giảm thiểu rủi ro tài chính hiệu quả nhất?",
          options: ["Vay thêm nợ ngắn hạn để trả nợ dài hạn", "Phát hành thêm cổ phiếu để tăng vốn chủ sở hữu và giảm tỷ lệ đòn bẩy", "Tăng chi phí quảng cáo để bán hàng nhanh hơn", "Mua lại cổ phiếu quỹ để tăng giá cổ phiếu"],
          correctIndex: 1,
          explanation: "Khi tỷ lệ Nợ/Vốn CSH quá cao (3.5 lần nghĩa là nợ gấp 3.5 lần vốn chủ), rủi ro phá sản tăng mạnh nếu lãi suất tăng hoặc dòng tiền từ bán hàng bị nghẽn. Việc phát hành thêm cổ phiếu (Equity Financing) giúp tăng vốn chủ sở hữu trực tiếp, từ đó kéo giảm tỷ lệ đòn bẩy mà không làm tăng áp lực trả lãi vay hàng tháng. Các biện pháp khác như vay thêm nợ chỉ làm trầm trọng thêm tình hình, còn tăng quảng cáo không đảm bảo thu được tiền ngay lập tức."
        },
        {
          question: "Tình huống: Nếu một công ty có tỷ lệ Nợ/Vốn chủ sở hữu là 3:1, điều này có nghĩa là gì?",
          options: ["Công ty đang rất an toàn", "Công ty đang sử dụng đòn bẩy tài chính cao", "Công ty không có nợ vay", "Vốn chủ sở hữu lớn gấp 3 lần nợ"],
          correctIndex: 1,
          explanation: "Tỷ lệ 3:1 nghĩa là nợ lớn gấp 3 lần vốn chủ sở hữu, cho thấy công ty đang sử dụng đòn bẩy rất cao, tiềm ẩn rủi ro nếu lãi suất tăng hoặc kinh doanh sa sút."
        },
        {
          question: "Tình huống: Một doanh nghiệp có Tài sản ngắn hạn thấp hơn Nợ ngắn hạn. Đây là dấu hiệu của điều gì?",
          options: ["Công ty đang tối ưu hóa vốn", "Rủi ro thanh khoản (có thể không đủ tiền trả nợ đến hạn)", "Công ty đang có quá nhiều tiền mặt", "Công ty đang làm ăn rất tốt"],
          correctIndex: 1,
          explanation: "Khi Nợ ngắn hạn > Tài sản ngắn hạn, công ty có thể gặp khó khăn trong việc thanh toán các khoản nợ sắp tới, gọi là mất cân đối tài chính."
        },
        {
          question: "Tình huống: Một công ty bất động sản có tỷ lệ Nợ/Vốn chủ sở hữu (D/E) lên tới 4.0 trong bối cảnh lãi suất đang tăng. Chiến lược giảm thiểu rủi ro nào là phù hợp nhất?",
          options: ["Tiếp tục vay thêm để hoàn thiện dự án nhanh hơn", "Bán bớt tài sản không cốt lõi để trả nợ và cơ cấu lại nguồn vốn", "Tăng cổ tức để giữ chân cổ đông", "Không làm gì vì bất động sản luôn tăng giá"],
          correctIndex: 1,
          explanation: "Khi đòn bẩy quá cao và chi phí vốn (lãi suất) tăng, việc giảm nợ bằng cách thanh lý tài sản hoặc phát hành thêm cổ phần là cần thiết để tránh mất khả năng thanh toán."
        }
      ],
      project: "### Project: Sức khỏe tài chính Tesla (TSLA)\n**Mục tiêu:** Đánh giá khả năng thanh toán và mức độ an toàn tài chính của Tesla.\n\n**Các bước thực hiện:**\n1. **Tra cứu:** Tìm con số 'Tài sản ngắn hạn' và 'Nợ ngắn hạn' của Tesla.\n2. **Tính toán:** Tính chỉ số thanh toán hiện hành: `Current Ratio = Tài sản ngắn hạn / Nợ ngắn hạn`.\n3. **Phân tích:** Nếu chỉ số này < 1.0, Tesla có nguy cơ gì? Nếu > 2.0, liệu họ có đang lãng phí tiền mặt?\n\n**Gợi ý:** Một công ty công nghệ như Tesla thường duy trì lượng tiền mặt lớn. Hãy kiểm tra xem 'Tiền và tương đương tiền' chiếm bao nhiêu % trong tổng tài sản."
    }
  },
  {
    id: 3,
    title: "Báo Cáo Lưu Chuyển Tiền Tệ (Cash Flow)",
    shortTitle: "Cash Flow",
    description: "Dòng tiền từ hoạt động kinh doanh, đầu tư và tài chính. 'Cash is King'.",
    companyExample: "Amazon (AMZN)",
    sections: {
      theory: "### 3. Tại sao Dòng tiền quan trọng hơn Lợi nhuận?\nLợi nhuận là con số trên giấy tờ (kế toán), còn dòng tiền (Cash Flow) là tiền mặt thực sự chạy vào và chạy ra khỏi túi của công ty.\n\n**Ba dòng tiền chính:**\n- **Hoạt động kinh doanh (CFO):** Tiền từ việc bán hàng và trả chi phí vận hành. Đây là 'máu' của doanh nghiệp.\n- **Hoạt động đầu tư (CFI):** Tiền chi để mua máy móc, nhà xưởng hoặc thu về từ việc bán tài sản.\n- **Hoạt động tài chính (CFF):** Tiền từ việc vay nợ, phát hành cổ phiếu hoặc trả cổ tức.\n\n**Dòng tiền tự do (Free Cash Flow - FCF):**\nFCF = CFO - Chi phí đầu tư tài sản cố định (Capex). Đây là số tiền thực sự còn lại để trả cổ tức, mua lại cổ phiếu hoặc trả nợ. Một công ty có FCF dương và tăng trưởng là dấu hiệu của một 'cỗ máy in tiền' thực thụ.\n\n**Ví dụ thực tế (Dữ liệu 2024):**\n- **Amazon (AMZN):** Năm 2024, Amazon ghi nhận CFO kỷ lục hơn **80 tỷ USD**. Mặc dù họ chi hàng chục tỷ USD cho trung tâm dữ liệu AI (CFI), FCF của họ vẫn rất mạnh mẽ, cho thấy hiệu quả vận hành vượt trội từ mảng AWS và bán lẻ.\n- **FPT Group:** FPT duy trì dòng tiền kinh doanh (CFO) ổn định quanh mức **7.000 - 8.000 tỷ VNĐ** mỗi năm. Điều này cho phép họ duy trì chính sách trả cổ tức bằng tiền mặt đều đặn cho cổ đông mà không cần vay nợ quá nhiều.\n\n*Hãy xem dữ liệu thực tế bên dưới để thấy dòng tiền của Amazon trong quý gần nhất.*",
      deepDive: "### Phân tích Dòng tiền (CFO, CFI, CFF)\nViệc hiểu rõ sự luân chuyển của tiền mặt giúp đánh giá sức khỏe thực sự của doanh nghiệp. Dưới đây là bảng tóm tắt và ví dụ minh họa:\n\n| Dòng tiền | Ý nghĩa & Tầm quan trọng | Dấu hiệu Sức khỏe | Ví dụ (Công ty A) |\n| :--- | :--- | :--- | :--- |\n| **CFO** (Kinh doanh) | Tiền từ lõi kinh doanh. Là 'máu' nuôi sống doanh nghiệp. | **Dương** và ổn định. Tốt nhất là CFO > Lợi nhuận ròng. | +1.200 tỷ (Bán hàng thu tiền ngay) |\n| **CFI** (Đầu tư) | Tiền chi cho tài sản, máy móc hoặc thâu tóm. | **Âm** thường là tốt (đang mở rộng). Dương có thể là bán tài sản. | -800 tỷ (Xây thêm nhà máy mới) |\n| **CFF** (Tài chính) | Tiền từ vay nợ, phát hành cổ phiếu hoặc trả cổ tức. | **Âm** (đang trả nợ/cổ tức) là dấu hiệu trưởng thành. | -300 tỷ (Trả nợ vay và cổ tức) |\n\n**Chú giải các chỉ số:**\n- **CFO > 0:** Công ty tự nuôi sống được mình từ kinh doanh.\n- **CFI < 0:** Công ty đang tái đầu tư để tăng trưởng trong tương lai.\n- **CFF < 0:** Công ty có dư tiền để trả nợ hoặc chia sẻ lợi nhuận cho cổ đông.\n\n**Lưu ý quan trọng:** Một công ty \"khỏe\" thường có **CFO > 0**, **CFI < 0** và **CFF < 0**. Nếu cả 3 dòng tiền đều âm, công ty đang 'đốt tiền' rất nhanh và có nguy cơ cạn kiệt thanh khoản!",
      exercise: "### Bài tập thực hành: Phân tích chất lượng lợi nhuận\n1. Tra cứu báo cáo lưu chuyển tiền tệ của **Amazon (AMZN)**.\n2. So sánh con số Lợi nhuận ròng và Dòng tiền từ hoạt động kinh doanh (CFO).\n3. Nếu CFO > Lợi nhuận ròng, điều đó có ý nghĩa gì về chất lượng lợi nhuận của Amazon?\n4. Tìm hiểu xem Amazon đang chi bao nhiêu tiền cho hoạt động đầu tư (CFI).",
      quiz: [
        {
          question: "Tình huống: Một công ty báo lãi 500 tỷ nhưng dòng tiền kinh doanh (CFO) lại âm 200 tỷ. Bạn nên làm gì?",
          options: ["Mua ngay vì lãi cao", "Cẩn trọng và kiểm tra xem tiền đang kẹt ở đâu (hàng tồn kho, nợ khách hàng...)", "Không quan tâm vì dòng tiền không quan trọng bằng lợi nhuận", "Chúc mừng công ty vì đã bán được nhiều hàng"],
          correctIndex: 1,
          explanation: "Lãi cao nhưng tiền không về túi là dấu hiệu rủi ro thanh khoản. Có thể công ty đang bị khách hàng chiếm dụng vốn quá nhiều hoặc hàng tồn kho ứ đọng."
        },
        {
          question: "Dòng tiền nào cho thấy công ty đang đầu tư mạnh mẽ vào tương lai?",
          options: ["CFO dương lớn", "CFI âm lớn (chi mua tài sản cố định)", "CFF dương lớn", "CFO âm"],
          correctIndex: 1,
          explanation: "CFI âm lớn thường do công ty chi tiền mua sắm máy móc, thiết bị, nhà xưởng (Capex) để mở rộng sản xuất."
        }
      ],
      project: "### Project: Cỗ máy in tiền FPT Group\n**Mục tiêu:** Kiểm tra chất lượng lợi nhuận của FPT thông qua dòng tiền.\n\n**Các bước thực hiện:**\n1. **So sánh:** Lấy số liệu Lợi nhuận sau thuế và Dòng tiền từ HĐKD (CFO) của FPT.\n2. **Đánh giá:** CFO có lớn hơn Lợi nhuận ròng không? Nếu có, chất lượng lợi nhuận rất tốt.\n3. **Đầu tư:** Xem dòng tiền từ HĐ đầu tư (CFI). FPT đang chi tiền vào đâu (mở rộng trung tâm dữ liệu hay thâu tóm công ty phần mềm)?\n\n**Gợi ý:** FPT là doanh nghiệp công nghệ, dòng tiền thường rất mạnh. Hãy dùng AI Chatbot hỏi: 'Phân tích cơ cấu dòng tiền của FPT năm qua'."
    }
  },
  {
    id: 4,
    title: "Các Chỉ Số Tài Chính Chính (Key Ratios)",
    shortTitle: "Chỉ Số Phân Tích",
    description: "ROE, ROA, P/E, P/B và các chỉ số thanh khoản.",
    companyExample: "Coca-Cola (KO)",
    sections: {
      theory: "### 4. Các chỉ số giúp 'khám sức khỏe' doanh nghiệp\nChỉ số tài chính giúp chúng ta so sánh các công ty khác nhau về quy mô một cách công bằng, giống như việc so sánh nhịp tim hay huyết áp của con người.\n\n**Các chỉ số quan trọng:**\n- **ROE (Return on Equity):** Lợi nhuận trên vốn chủ sở hữu. Đo lường hiệu quả sử dụng vốn của cổ đông.\n- **P/E (Price to Earnings):** Giá trên thu nhập. Cho biết nhà đầu tư sẵn sàng trả bao nhiêu cho 1 đồng lợi nhuận.\n- **Current Ratio:** Chỉ số thanh toán hiện hành. Đo lường khả năng trả nợ ngắn hạn.\n\n**Phân tích DuPont:**\nROE có thể được chia thành 3 phần: Biên lợi nhuận ròng x Vòng quay tài sản x Đòn bẩy tài chính. Điều này giúp bạn biết ROE cao là do kinh doanh hiệu quả, bán hàng nhanh hay do vay nợ nhiều.\n\n**Ví dụ thực tế (Dữ liệu 2024):**\n- **Coca-Cola (KO):** Duy trì ROE ấn tượng trên **40%**. Mặc dù biên lợi nhuận ròng rất tốt (~23%), ROE cao của KO còn đến từ việc họ tối ưu hóa cấu trúc vốn và vòng quay tài sản hiệu quả.\n- **Vietcombank (VCB):** Với lợi nhuận ròng năm 2024 đạt kỷ lục hơn **40.000 tỷ VNĐ**, VCB duy trì ROE quanh mức **20-25%**, dẫn đầu hệ thống ngân hàng Việt Nam về hiệu quả và chất lượng tài sản (tỷ lệ nợ xấu NPL cực thấp).\n\n*Hãy xem dữ liệu thực tế bên dưới để biết các chỉ số P/E, ROE hiện tại của Coca-Cola.*",
      deepDive: "### Chỉ số đặc thù theo ngành\n- **Ngành Ngân hàng:** Tập trung vào NIM (Net Interest Margin), LDR (Loan to Deposit Ratio) và NPL (Non-Performing Loan).\n- **Ngành Bán lẻ:** Tập trung vào SSSG (Same Store Sales Growth) và Vòng quay hàng tồn kho.\n- **Ngành Công nghệ:** Tập trung vào CAC (Customer Acquisition Cost) và LTV (Lifetime Value) đối với các mô hình SaaS.\n\n**Lưu ý:** P/E của một công ty công nghệ tăng trưởng nhanh (như NVIDIA) thường cao hơn nhiều so với một công ty sản xuất truyền thống.",
      exercise: "### Bài tập thực hành: So sánh đối thủ\n1. Tra cứu chỉ số P/E và ROE của **Coca-Cola (KO)** và **PepsiCo (PEP)**.\n2. Công ty nào đang có ROE cao hơn? Điều đó nói lên điều gì về hiệu quả sử dụng vốn?\n3. So sánh P/E của cả hai. Thị trường đang kỳ vọng vào công ty nào nhiều hơn?",
      quiz: [
        {
          question: "Tình huống: Nếu ROE của một công ty tăng từ 15% lên 25% trong khi lợi nhuận không đổi, điều gì đã xảy ra?",
          options: ["Công ty đã mua lại cổ phiếu quỹ (giảm vốn chủ sở hữu)", "Công ty đã phát hành thêm cổ phiếu", "Công ty đang kinh doanh kém hiệu quả hơn", "Không có trường hợp nào đúng"],
          correctIndex: 0,
          explanation: "ROE = Lợi nhuận / Vốn CSH. Nếu lợi nhuận không đổi mà ROE tăng, chứng tỏ mẫu số (Vốn CSH) đã giảm xuống, thường là do công ty mua lại cổ phiếu quỹ."
        },
        {
          question: "Chỉ số nào cho biết giá cổ phiếu đang đắt hay rẻ so với giá trị sổ sách của công ty?",
          options: ["P/E", "P/B (Price to Book)", "ROE", "EPS"],
          correctIndex: 1,
          explanation: "P/B so sánh giá thị trường với giá trị tài sản ròng trên sổ sách của công ty."
        }
      ],
      project: "### Project: Giải mã ROE của Vietcombank (VCB)\n**Mục tiêu:** Hiểu rõ động lực thúc đẩy lợi nhuận của ngân hàng số 1 Việt Nam.\n\n**Các bước thực hiện:**\n1. **Dữ liệu:** Tìm ROE, Biên lợi nhuận ròng và Tỷ lệ đòn bẩy của VCB.\n2. **Phân tích DuPont:** ROE của VCB cao là do họ cho vay hiệu quả (biên lãi cao) hay do quy mô tài sản cực lớn?\n3. **So sánh:** So sánh ROE của VCB với một ngân hàng khác (VD: BIDV hoặc TCB).\n\n**Gợi ý:** Trong ngành ngân hàng, ROE > 20% được coi là xuất sắc. Hãy chú ý đến tỷ lệ nợ xấu (NPL) vì nó ảnh hưởng trực tiếp đến lợi nhuận ròng."
    }
  },
  {
    id: 5,
    title: "Định Giá Cổ Phiếu (Valuation)",
    shortTitle: "Định Giá",
    description: "Phương pháp DCF, P/E Forward và so sánh ngang.",
    companyExample: "NVIDIA (NVDA)",
    sections: {
      theory: "### 5. Làm sao biết cổ phiếu đắt hay rẻ?\nĐịnh giá là nghệ thuật xác định giá trị thực (giá trị nội tại) của một công ty, phân biệt với giá thị trường đang giao dịch.\n\n**Phương pháp P/E Forward (Định giá dựa trên tương lai):**\nKhác với P/E thông thường (dựa trên lợi nhuận quá khứ), **P/E Forward** sử dụng lợi nhuận dự kiến (EPS dự báo) của 12 tháng tới.\n- **Cách tính:** `P/E Forward = Giá cổ phiếu hiện tại / EPS dự kiến năm tới`.\n- **Ý nghĩa:** Giúp nhà đầu tư đánh giá xem mức giá hiện tại có đắt không nếu xét đến tiềm năng tăng trưởng trong tương lai. Đối với các công ty tăng trưởng nhanh, P/E Forward thường thấp hơn nhiều so với P/E hiện tại.\n\n**Biên an toàn (Margin of Safety):**\nLà khoảng cách giữa giá trị nội tại và giá thị trường. Benjamin Graham khuyên chỉ nên mua khi giá thị trường thấp hơn đáng kể so với giá trị nội tại để bảo vệ vốn trước những sai sót trong dự báo.\n\n**Ví dụ thực tế (Dữ liệu 2024-2025):**\n- **NVIDIA (NVDA):** Với sự bùng nổ của AI, doanh thu NVIDIA năm 2024 tăng trưởng hơn **200%**. Giả sử P/E hiện tại là **80 lần** (dựa trên lợi nhuận năm ngoái). Tuy nhiên, các nhà phân tích dự báo lợi nhuận năm tới sẽ tăng gấp đôi. Khi đó, **P/E Forward chỉ còn khoảng 40 lần**. Đối với một công ty thống trị mảng chip AI, mức P/E Forward 40 có thể được coi là 'hợp lý' hơn nhiều so với con số 80, vì nó phản ánh đúng kỳ vọng tăng trưởng thần tốc của doanh nghiệp.\n- **Thế Giới Di Động (MWG):** Năm 2024, MWG tập trung vào việc đưa Bách Hóa Xanh đạt điểm hòa vốn và có lãi. Định giá MWG hiện tại không chỉ dựa trên lợi nhuận hiện tại mà còn dựa trên kỳ vọng vào giá trị của chuỗi Bách Hóa Xanh khi niêm yết riêng lẻ hoặc thu hút vốn ngoại.\n\n*Hãy xem dữ liệu thực tế bên dưới để biết giá cổ phiếu và định giá hiện tại của NVIDIA.*",
      deepDive: "### Định giá theo ngành đặc thù\n- **Ngành Công nghệ tăng trưởng:** Thường dùng P/S (Price to Sales) hoặc EV/EBITDA vì lợi nhuận giai đoạn đầu có thể thấp do chi phí đầu tư lớn.\n- **Ngành Sản xuất/Bất động sản:** Thường dùng P/B (Price to Book Value) để xem giá cổ phiếu so với giá trị tài sản ròng trên sổ sách.\n- **Ngành Tiêu dùng ổn định:** Thường dùng mô hình chiết khấu cổ tức (DDM).",
      exercise: "### Bài tập thực hành: Định giá nhanh\n1. Tra cứu giá cổ phiếu hiện tại và P/E của **NVIDIA (NVDA)**.\n2. Tìm hiểu tốc độ tăng trưởng doanh thu dự kiến của NVIDIA trong năm tới.\n3. Nếu P/E của NVIDIA cao hơn trung bình ngành 50%, bạn nghĩ lý do là gì? Nó có xứng đáng với mức giá đó không?",
      quiz: [
        {
          question: "Tình huống: Bạn thấy một cổ phiếu có P/E là 5, thấp hơn nhiều so với trung bình ngành là 15. Bạn nên làm gì?",
          options: ["Mua ngay lập tức vì quá rẻ", "Kiểm tra xem công ty có đang gặp vấn đề nghiêm trọng gì không (Value Trap)", "Bỏ qua vì P/E thấp là không tốt", "Đợi P/E tăng lên 15 rồi mới mua"],
          correctIndex: 1,
          explanation: "P/E thấp có thể là món hời, nhưng cũng có thể là 'bẫy giá trị' (Value Trap) nếu công ty đang trên đà suy thoái hoặc có rủi ro pháp lý lớn khiến nhà đầu tư tháo chạy."
        },
        {
          question: "Phương pháp định giá nào phù hợp nhất cho một công ty công nghệ chưa có lợi nhuận nhưng doanh thu tăng trưởng mạnh?",
          options: ["P/E (Price to Earnings)", "P/S (Price to Sales)", "P/B (Price to Book)", "Cổ tức chiết khấu (DDM)"],
          correctIndex: 1,
          explanation: "Khi chưa có lợi nhuận (E âm), P/E không sử dụng được. P/S là chỉ số thay thế tốt để đánh giá giá trị dựa trên doanh thu."
        }
      ],
      project: "### Project: Định giá NVIDIA (NVDA) & MWG\n**Mục tiêu:** Xác định giá trị hợp lý để đưa ra quyết định đầu tư.\n\n**Nhiệm vụ 1 (MWG):** Sử dụng P/E và P/S để định giá Thế Giới Di Động. Liệu kỳ vọng vào Bách Hóa Xanh đã phản ánh hết vào giá chưa?\n\n**Nhiệm vụ 2 (NVDA):** \n1. Tìm EPS dự báo (Forward EPS) của NVIDIA cho năm tới.\n2. Tính P/E Forward dựa trên giá hiện tại.\n3. So sánh P/E Forward với tốc độ tăng trưởng dự kiến (PEG Ratio).\n\n**Gợi ý:** Sử dụng AI Chatbot hỏi: 'Analyst consensus for NVDA Forward EPS' và 'PEG ratio of NVDA vs Industry average'."
    }
  },
  {
    id: 6,
    title: "Phân Tích Toàn Diện & Ra Quyết Định",
    shortTitle: "Tổng Kết & Quyết Định",
    description: "Kết hợp tất cả các báo cáo để đưa ra nhận định đầu tư cuối cùng.",
    companyExample: "Vingroup (VIC)",
    sections: {
      theory: "### 6. Bức tranh toàn cảnh về sức khỏe tài chính\nPhân tích tài chính không chỉ là nhìn vào từng con số lẻ tẻ, mà là kết nối chúng lại để hiểu 'câu chuyện' đằng sau doanh nghiệp.\n\n**Phân tích Định tính và Rủi ro hệ thống:**\nBên cạnh các con số, nhà đầu tư cần xem xét các yếu tố định tính như: Năng lực ban lãnh đạo, lợi thế cạnh tranh (Moat), và các rủi ro vĩ mô (lãi suất, lạm phát, địa chính trị). Một công ty tốt trong một ngành đang suy thoái vẫn có thể là một khoản đầu tư tồi.\n\n**Ví dụ thực tế (Dữ liệu 2024):**\n- **Vingroup (VIC):** Năm 2024, Vingroup đạt doanh thu kỷ lục hơn **160.000 tỷ VNĐ**. Tuy nhiên, dòng tiền và lợi nhuận chịu áp lực lớn từ mảng VinFast đang trong giai đoạn đầu tư mạnh mẽ. Phân tích VIC đòi hỏi sự kết hợp giữa mảng BĐS (Vinhomes) mang lại dòng tiền lớn và mảng Công nghiệp (VinFast) mang tính đột phá nhưng rủi ro cao.\n\n*Hãy xem dữ liệu thực tế bên dưới để thấy bức tranh tài chính tổng thể của Vingroup.*",
      deepDive: "### Phân tích Tập đoàn đa ngành (Conglomerate)\n- **Ưu điểm:** Đa dạng hóa nguồn thu, giảm rủi ro từ một ngành duy nhất.\n- **Nhược điểm:** Khó phân tích chính xác, rủi ro từ các mảng kinh doanh kém hiệu quả kéo lùi mảng tốt.\n- **Phương pháp SOTP (Sum-of-the-Parts):** Định giá riêng từng mảng kinh doanh rồi cộng lại để ra giá trị toàn tập đoàn.",
      exercise: "### Bài tập cuối khóa: Đánh giá Vingroup (VIC)\n1. Sử dụng công cụ tra cứu để lấy dữ liệu mới nhất về Doanh thu, Lợi nhuận và Tổng nợ của **Vingroup (VIC)**.\n2. Tính tỷ lệ Nợ/Vốn chủ sở hữu.\n3. Tìm hiểu thông tin về mảng VinFast ảnh hưởng thế nào đến dòng tiền của tập đoàn.\n4. Dựa trên tất cả các module đã học, bạn sẽ đưa ra khuyến nghị gì (Mua/Bán/Theo dõi) cho VIC?",
      quiz: [
        {
          question: "Tại sao dòng tiền từ hoạt động kinh doanh (CFO) âm liên tục lại là dấu hiệu nguy hiểm dù công ty vẫn báo lãi?",
          options: ["Vì công ty đang đóng thuế quá nhiều", "Vì lợi nhuận có thể chỉ là thủ thuật kế toán và công ty đang cạn kiệt tiền mặt", "Vì công ty đang đầu tư quá nhiều", "Vì cổ đông không thích tiền mặt"],
          correctIndex: 1,
          explanation: "Lãi ảo nhưng tiền không về là dấu hiệu của việc ghi nhận doanh thu khống hoặc nợ khó đòi tăng cao, dễ dẫn đến phá sản."
        },
        {
          question: "Khi phân tích một tập đoàn đa ngành như Vingroup, phương pháp định giá nào thường được các chuyên gia sử dụng?",
          options: ["Chỉ dùng P/E", "Chỉ dùng P/B", "Sum-of-the-Parts (SOTP)", "Định giá dựa trên cảm tính"],
          correctIndex: 2,
          explanation: "SOTP giúp định giá chính xác từng mảng kinh doanh khác nhau (BĐS, Công nghiệp, Bán lẻ) trước khi tổng hợp lại."
        }
      ],
      project: "### Final Project: Báo cáo phân tích VN30\n**Mục tiêu:** Tổng hợp mọi kỹ năng để lập một bản kế hoạch đầu tư chuyên nghiệp.\n\n**Yêu cầu:**\n1. **Chọn mã:** Chọn 1 cổ phiếu trong rổ VN30 (VD: HPG, VNM, FPT, MWG).\n2. **Phân tích 3 chiều:** Kết hợp Kết quả kinh doanh, Bảng cân đối và Dòng tiền.\n3. **Định giá:** Đưa ra mức giá mục tiêu (Target Price).\n4. **Kết luận:** Đưa ra khuyến nghị Mua/Bán/Theo dõi kèm theo 3 lý do chính.\n\n**Gợi ý:** Hãy trình bày báo cáo theo cấu trúc: Tổng quan -> Điểm nhấn tài chính -> Định giá -> Rủi ro. Bạn có thể nhờ AI Chatbot: 'Viết dàn ý báo cáo phân tích cho cổ phiếu [Mã]'."
    }
  }
];
