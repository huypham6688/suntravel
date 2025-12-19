import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, User, Clock, ChevronRight, Tag, Facebook, Share2, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data - trong thực tế sẽ fetch từ database
const articlesData: Record<string, Article> = {
  "1": {
    id: "1",
    title: "Top 10 điểm check-in không thể bỏ lỡ tại Đà Nẵng 2025",
    excerpt: "Khám phá những địa điểm sống ảo đẹp nhất tại thành phố đáng sống nhất Việt Nam.",
    content: `
      <p>Đà Nẵng - thành phố đáng sống nhất Việt Nam không chỉ nổi tiếng với những bãi biển tuyệt đẹp mà còn sở hữu vô vàn điểm check-in ấn tượng. Hãy cùng Suntravel khám phá top 10 địa điểm không thể bỏ lỡ khi đến Đà Nẵng năm 2025!</p>
      
      <h2>1. Cầu Vàng - Bà Nà Hills</h2>
      <p>Cầu Vàng với đôi bàn tay khổng lồ nâng đỡ đã trở thành biểu tượng du lịch của Việt Nam. Cây cầu dài 150m uốn lượn giữa núi rừng Bà Nà, mang đến góc chụp tuyệt đẹp với view nhìn ra toàn cảnh thành phố.</p>
      
      <h2>2. Bán đảo Sơn Trà</h2>
      <p>Được mệnh danh là "lá phổi xanh" của Đà Nẵng, Sơn Trà sở hữu nhiều điểm check-in tuyệt đẹp như: đỉnh Bàn Cờ, chùa Linh Ứng với tượng Phật bà cao 67m, và những cung đường ven biển đẹp như mơ.</p>
      
      <h2>3. Cầu Rồng</h2>
      <p>Cầu Rồng là công trình kiến trúc độc đáo với hình dáng con rồng uốn lượn. Đặc biệt vào 21h thứ 7 và Chủ nhật hàng tuần, rồng sẽ phun lửa và phun nước - một cảnh tượng không thể bỏ lỡ!</p>
      
      <h2>4. Bãi biển Mỹ Khê</h2>
      <p>Được Forbes bình chọn là một trong 6 bãi biển quyến rũ nhất hành tinh, Mỹ Khê sở hữu bờ cát trắng mịn trải dài, làn nước trong xanh và sóng vừa phải - lý tưởng cho cả tắm biển và lướt ván.</p>
      
      <h2>5. Ngũ Hành Sơn</h2>
      <p>Cụm núi đá vôi với các hang động, chùa chiền cổ kính. Từ đỉnh Thủy Sơn, bạn có thể ngắm toàn cảnh Đà Nẵng và biển Đông tuyệt đẹp.</p>
      
      <h2>6. Phố cổ Hội An (30km từ Đà Nẵng)</h2>
      <p>Dù không nằm ở Đà Nẵng nhưng Hội An chỉ cách 30 phút đi xe. Phố cổ lung linh đèn lồng, những ngôi nhà cổ trăm tuổi và không khí yên bình sẽ cho bạn những bức ảnh đẹp xuất sắc.</p>
      
      <h2>7. Công viên Châu Á - Asia Park</h2>
      <p>Sun World với vòng quay Sun Wheel cao 115m - một trong những vòng quay lớn nhất thế giới. View từ vòng quay nhìn xuống thành phố về đêm vô cùng lung linh.</p>
      
      <h2>8. Làng Bích Họa Tam Thanh</h2>
      <p>Làng chài nhỏ với những bức tranh tường sống động, đầy màu sắc. Đây là địa điểm check-in độc đáo, mang đến những bức ảnh nghệ thuật đường phố ấn tượng.</p>
      
      <h2>9. Chợ Hàn & Chợ Cồn</h2>
      <p>Muốn có những bức ảnh đậm chất đường phố, hãy ghé chợ Hàn hoặc chợ Cồn - nơi bạn có thể vừa thưởng thức ẩm thực vừa ghi lại những khoảnh khắc đời thường sinh động.</p>
      
      <h2>10. Đèo Hải Vân</h2>
      <p>"Thiên hạ đệ nhất hùng quan" - cung đường đèo đẹp nhất Việt Nam với một bên là núi, một bên là biển xanh ngắt. Đây là điểm dừng chân lý tưởng trên hành trình Đà Nẵng - Huế.</p>
      
      <h2>Lời khuyên từ Suntravel</h2>
      <ul>
        <li>Thời điểm đẹp nhất để du lịch Đà Nẵng: Tháng 3-8</li>
        <li>Nên đi Bà Nà vào ngày thường để tránh đông đúc</li>
        <li>Mang theo kem chống nắng và mũ khi đi biển</li>
        <li>Đặt tour trọn gói để tiết kiệm chi phí và thời gian</li>
      </ul>
    `,
    image: "/da-nang-golden-bridge-check-in.jpg",
    date: "28/03/2025",
    author: "Suntravel Team",
    readTime: "8 phút đọc",
    category: "Trong nước",
    tags: ["Đà Nẵng", "Check-in", "Du lịch miền Trung", "Cầu Vàng"],
  },
  "2": {
    id: "2",
    title: "Kinh nghiệm du lịch Thái Lan tự túc chi tiết từ A-Z",
    excerpt: "Hướng dẫn đầy đủ cho chuyến du lịch Thái Lan đầu tiên của bạn với ngân sách tiết kiệm.",
    content: `
      <p>Thái Lan là điểm đến yêu thích của du khách Việt Nam nhờ chi phí hợp lý, thủ tục đơn giản và vô vàn trải nghiệm thú vị. Bài viết này sẽ cung cấp cho bạn kinh nghiệm du lịch Thái Lan tự túc chi tiết nhất!</p>
      
      <h2>1. Visa và thủ tục nhập cảnh</h2>
      <p>Công dân Việt Nam được miễn visa khi nhập cảnh Thái Lan trong vòng 30 ngày. Bạn chỉ cần:</p>
      <ul>
        <li>Hộ chiếu còn hạn trên 6 tháng</li>
        <li>Vé máy bay khứ hồi</li>
        <li>Chứng minh tài chính: 20,000 Baht/người hoặc 40,000 Baht/gia đình</li>
        <li>Địa chỉ khách sạn lưu trú</li>
      </ul>
      
      <h2>2. Thời điểm du lịch tốt nhất</h2>
      <p>Thái Lan có 3 mùa chính:</p>
      <ul>
        <li><strong>Mùa nóng (3-5):</strong> Nhiệt độ cao, lên đến 40°C</li>
        <li><strong>Mùa mưa (6-10):</strong> Mưa nhiều nhưng giá rẻ hơn</li>
        <li><strong>Mùa mát (11-2):</strong> Thời tiết lý tưởng nhất để du lịch</li>
      </ul>
      
      <h2>3. Di chuyển trong Thái Lan</h2>
      <h3>Từ sân bay về trung tâm Bangkok</h3>
      <ul>
        <li><strong>Airport Rail Link:</strong> 45 Baht, nhanh và tiện lợi</li>
        <li><strong>Taxi:</strong> 300-400 Baht (cộng thêm phí cao tốc)</li>
        <li><strong>Grab:</strong> 400-500 Baht</li>
      </ul>
      
      <h3>Di chuyển trong thành phố</h3>
      <ul>
        <li><strong>BTS/MRT:</strong> 16-44 Baht/chuyến</li>
        <li><strong>Taxi:</strong> Bắt đầu từ 35 Baht</li>
        <li><strong>Tuk tuk:</strong> Thỏa thuận giá trước</li>
        <li><strong>Grab:</strong> Tiện lợi và giá cố định</li>
      </ul>
      
      <h2>4. Chi phí dự kiến (5 ngày 4 đêm)</h2>
      <ul>
        <li>Vé máy bay: 3-5 triệu VNĐ (khứ hồi)</li>
        <li>Khách sạn 3 sao: 600,000 VNĐ/đêm</li>
        <li>Ăn uống: 300,000-500,000 VNĐ/ngày</li>
        <li>Di chuyển: 200,000 VNĐ/ngày</li>
        <li>Vé tham quan: 1-2 triệu VNĐ</li>
        <li><strong>Tổng: ~8-12 triệu VNĐ/người</strong></li>
      </ul>
      
      <h2>5. Ẩm thực không thể bỏ qua</h2>
      <ul>
        <li>Pad Thai - Phở xào Thái</li>
        <li>Tom Yum Goong - Canh chua tôm</li>
        <li>Som Tam - Gỏi đu đủ</li>
        <li>Mango Sticky Rice - Xôi xoài</li>
        <li>Boat Noodle - Mì thuyền</li>
      </ul>
      
      <h2>6. Những lưu ý quan trọng</h2>
      <ul>
        <li>Tôn trọng Hoàng gia và tôn giáo</li>
        <li>Mặc kín đáo khi vào chùa</li>
        <li>Không sờ đầu người khác</li>
        <li>Đổi tiền tại Super Rich để được tỷ giá tốt</li>
        <li>Mua sim 4G tại sân bay (khoảng 300 Baht/7 ngày)</li>
      </ul>
      
      <h2>Lời khuyên từ Suntravel</h2>
      <p>Nếu bạn lần đầu đến Thái Lan hoặc muốn tiết kiệm thời gian, hãy tham khảo các tour trọn gói của Suntravel. Chúng tôi cam kết mang đến trải nghiệm tuyệt vời với chi phí hợp lý nhất!</p>
    `,
    image: "/thailand-bangkok-travel-guide.jpg",
    date: "25/03/2025",
    author: "Ms. Hồng Anh",
    readTime: "12 phút đọc",
    category: "Nước ngoài",
    tags: ["Thái Lan", "Bangkok", "Tự túc", "Kinh nghiệm"],
  },
  "3": {
    id: "3",
    title: "Sapa mùa nào đẹp nhất? Lịch trình 3 ngày 2 đêm hoàn hảo",
    excerpt: "Tất tần tật về thời điểm lý tưởng và lịch trình chi tiết cho chuyến đi Sapa.",
    content: `
      <p>Sapa - vùng đất của ruộng bậc thang, núi non hùng vĩ và văn hóa dân tộc đặc sắc. Vậy Sapa đẹp nhất vào mùa nào? Hãy cùng tìm hiểu qua bài viết chi tiết dưới đây!</p>
      
      <h2>Sapa đẹp nhất vào mùa nào?</h2>
      
      <h3>Mùa xuân (Tháng 3-4)</h3>
      <p>Thời tiết mát mẻ, hoa đào, hoa mận nở rộ. Ruộng bậc thang bắt đầu đổ nước, tạo nên cảnh quan như gương phản chiếu trời mây.</p>
      <p><strong>Ưu điểm:</strong> Ít mưa, không quá lạnh, cảnh đẹp</p>
      <p><strong>Nhược điểm:</strong> Du khách đông (dịp lễ 30/4)</p>
      
      <h3>Mùa hè (Tháng 5-8)</h3>
      <p>Lúa xanh ngắt phủ kín các thửa ruộng bậc thang. Thời tiết mát mẻ, là nơi tránh nóng lý tưởng.</p>
      <p><strong>Ưu điểm:</strong> Ruộng bậc thang xanh mướt, mát mẻ</p>
      <p><strong>Nhược điểm:</strong> Hay có mưa, có thể bị sương mù dày</p>
      
      <h3>Mùa thu (Tháng 9-10)</h3>
      <p><strong>Đây là mùa đẹp nhất!</strong> Lúa chín vàng óng, tạo nên cảnh quan tuyệt đẹp. Thời tiết khô ráo, se lạnh dễ chịu.</p>
      <p><strong>Ưu điểm:</strong> Ruộng bậc thang vàng óng, thời tiết đẹp</p>
      <p><strong>Nhược điểm:</strong> Đông du khách, giá cao hơn</p>
      
      <h3>Mùa đông (Tháng 11-2)</h3>
      <p>Có thể gặp tuyết rơi, băng giá. Cảnh vật nên thơ nhưng khá lạnh (có thể dưới 0°C).</p>
      <p><strong>Ưu điểm:</strong> Có thể ngắm tuyết, ít du khách</p>
      <p><strong>Nhược điểm:</strong> Rất lạnh, sương mù dày</p>
      
      <h2>Lịch trình 3 ngày 2 đêm Sapa</h2>
      
      <h3>Ngày 1: Hà Nội - Sapa - Bản Cát Cát</h3>
      <ul>
        <li><strong>6:00:</strong> Xuất phát từ Hà Nội</li>
        <li><strong>11:00:</strong> Đến Sapa, nhận phòng khách sạn</li>
        <li><strong>14:00:</strong> Thăm bản Cát Cát - bản làng người H'Mông</li>
        <li><strong>18:00:</strong> Dạo phố, thưởng thức ẩm thực địa phương</li>
        <li><strong>20:00:</strong> Check-in nhà thờ đá Sapa</li>
      </ul>
      
      <h3>Ngày 2: Fansipan - Bản Tả Phìn</h3>
      <ul>
        <li><strong>7:00:</strong> Ăn sáng, di chuyển đến ga cáp treo</li>
        <li><strong>8:00:</strong> Chinh phục đỉnh Fansipan - Nóc nhà Đông Dương</li>
        <li><strong>12:00:</strong> Ăn trưa, trở về</li>
        <li><strong>14:00:</strong> Thăm bản Tả Phìn - làng người Dao đỏ</li>
        <li><strong>17:00:</strong> Ngắm hoàng hôn tại đồi Mâm Xôi</li>
      </ul>
      
      <h3>Ngày 3: Thung lũng Mường Hoa - Hà Nội</h3>
      <ul>
        <li><strong>7:00:</strong> Ăn sáng, trả phòng</li>
        <li><strong>8:00:</strong> Trekking thung lũng Mường Hoa, ruộng bậc thang</li>
        <li><strong>11:00:</strong> Di chuyển về Hà Nội</li>
        <li><strong>16:00:</strong> Về đến Hà Nội</li>
      </ul>
      
      <h2>Chi phí tham khảo</h2>
      <ul>
        <li>Xe khách/limousine: 250,000 - 400,000 VNĐ/chiều</li>
        <li>Khách sạn 3 sao: 500,000 - 800,000 VNĐ/đêm</li>
        <li>Vé cáp treo Fansipan: 700,000 VNĐ</li>
        <li>Vé bản Cát Cát: 70,000 VNĐ</li>
        <li>Ăn uống: 200,000 - 300,000 VNĐ/ngày</li>
        <li><strong>Tổng: ~3-4 triệu VNĐ/người</strong></li>
      </ul>
      
      <h2>Đặt tour Sapa cùng Suntravel</h2>
      <p>Để có chuyến đi Sapa trọn vẹn và tiết kiệm, hãy liên hệ Suntravel để được tư vấn các gói tour phù hợp. Chúng tôi có các tour 2 ngày 1 đêm, 3 ngày 2 đêm với mức giá cạnh tranh nhất!</p>
    `,
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "20/03/2025",
    author: "Ms. Quyên",
    readTime: "10 phút đọc",
    category: "Trong nước",
    tags: ["Sapa", "Tây Bắc", "Ruộng bậc thang", "Lịch trình"],
  },
}

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  readTime: string
  category: string
  tags: string[]
}

// Related articles
const relatedArticles = [
  {
    id: "1",
    title: "Top 10 điểm check-in không thể bỏ lỡ tại Đà Nẵng 2025",
    image: "/da-nang-golden-bridge-check-in.jpg",
    date: "28/03/2025",
  },
  {
    id: "2",
    title: "Kinh nghiệm du lịch Thái Lan tự túc chi tiết từ A-Z",
    image: "/thailand-bangkok-travel-guide.jpg",
    date: "25/03/2025",
  },
  {
    id: "3",
    title: "Sapa mùa nào đẹp nhất? Lịch trình 3 ngày 2 đêm hoàn hảo",
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "20/03/2025",
  },
]

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = articlesData[id]

  if (!article) {
    notFound()
  }

  const filteredRelated = relatedArticles.filter((a) => a.id !== id).slice(0, 2)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Badge className="bg-secondary text-secondary-foreground mb-4">{article.category}</Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif max-w-4xl text-balance">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/cam-nang" className="hover:text-primary transition-colors">
              Dịch vụ du lịch
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Content */}
            <article
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-5 h-5 text-muted-foreground" />
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-muted-foreground">Chia sẻ:</span>
              <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-between gap-4">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/cam-nang">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                <Link href="/lien-he">
                  Liên hệ tư vấn
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* CTA Card */}
            <div className="bg-primary/10 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-foreground text-lg mb-3 font-serif">Cần tư vấn tour?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Liên hệ ngay Suntravel để được tư vấn các tour du lịch phù hợp với lịch trình và ngân sách của bạn!
              </p>
              <div className="space-y-3 mb-4">
                <a href="tel:0903287313" className="flex items-center gap-2 text-sm text-foreground hover:text-primary">
                  <span className="font-medium">Ms. Quyên:</span> 0903.287.313
                </a>
                <a href="tel:0974248805" className="flex items-center gap-2 text-sm text-foreground hover:text-primary">
                  <span className="font-medium">Ms. Hồng Anh:</span> 0974.248.805
                </a>
              </div>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/lien-he">Liên hệ ngay</Link>
              </Button>
            </div>

            {/* Related Articles */}
            <div className="bg-card rounded-2xl p-6">
              <h3 className="font-semibold text-foreground text-lg mb-4 font-serif">Bài viết liên quan</h3>
              <div className="space-y-4">
                {filteredRelated.map((related) => (
                  <Link
                    key={related.id}
                    href={`/cam-nang/${related.id}`}
                    className="flex gap-4 group hover:bg-muted/50 p-2 rounded-lg -mx-2 transition-colors"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full mt-4 border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <Link href="/cam-nang">Xem tất cả bài viết</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
