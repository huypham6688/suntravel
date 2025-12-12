import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const articles = [
  {
    id: "1",
    title: "Top 10 điểm check-in không thể bỏ lỡ tại Đà Nẵng 2025",
    excerpt:
      "Khám phá những địa điểm sống ảo đẹp nhất tại thành phố đáng sống nhất Việt Nam. Từ Cầu Vàng, Bà Nà đến những bãi biển tuyệt đẹp...",
    image: "/da-nang-golden-bridge-check-in.jpg",
    date: "28/03/2025",
    author: "Suntravel Team",
    category: "Trong nước",
    readTime: "5 phút đọc",
  },
  {
    id: "2",
    title: "Kinh nghiệm du lịch Thái Lan tự túc chi tiết từ A-Z",
    excerpt:
      "Hướng dẫn đầy đủ cho chuyến du lịch Thái Lan đầu tiên của bạn với ngân sách tiết kiệm. Visa, đi lại, ăn ở và mua sắm...",
    image: "/thailand-bangkok-travel-guide.jpg",
    date: "25/03/2025",
    author: "Ms. Quyên",
    category: "Nước ngoài",
    readTime: "10 phút đọc",
  },
  {
    id: "3",
    title: "Sapa mùa nào đẹp nhất? Lịch trình 3 ngày 2 đêm hoàn hảo",
    excerpt:
      "Tất tần tật về thời điểm lý tưởng và lịch trình chi tiết cho chuyến đi Sapa. Mùa lúa chín hay mùa hoa đào...",
    image: "/sapa-vietnam-rice-fields-misty.jpg",
    date: "20/03/2025",
    author: "Suntravel Team",
    category: "Trong nước",
    readTime: "8 phút đọc",
  },
  {
    id: "4",
    title: "Review chi tiết resort 5 sao Phú Quốc - Nơi nào đáng tiền nhất?",
    excerpt:
      "So sánh chi tiết các resort 5 sao hàng đầu tại Phú Quốc. Vinpearl, JW Marriott hay InterContinental - lựa chọn nào cho bạn?",
    image: "/phu-quoc-resort-review.jpg",
    date: "18/03/2025",
    author: "Ms. Hồng Anh",
    category: "Review",
    readTime: "12 phút đọc",
  },
  {
    id: "5",
    title: "Hướng dẫn xin visa Hàn Quốc 2025 - Tỷ lệ đậu 99%",
    excerpt:
      "Cập nhật mới nhất về thủ tục xin visa Hàn Quốc năm 2025. Hồ sơ cần chuẩn bị, lịch hẹn và những lưu ý quan trọng...",
    image: "/korea-visa-guide.jpg",
    date: "15/03/2025",
    author: "Ms. Quyên",
    category: "Hướng dẫn",
    readTime: "7 phút đọc",
  },
  {
    id: "6",
    title: "Ẩm thực đường phố Bangkok - 20 món ngon nhất định phải thử",
    excerpt:
      "Khám phá thiên đường ẩm thực đường phố Bangkok với những món ăn ngon khó cưỡng. Pad Thai, Tom Yum, Mango Sticky Rice...",
    image: "/bangkok-street-food.jpg",
    date: "12/03/2025",
    author: "Suntravel Team",
    category: "Ẩm thực",
    readTime: "6 phút đọc",
  },
]

const categories = ["Tất cả", "Trong nước", "Nước ngoài", "Review", "Hướng dẫn", "Ẩm thực", "Mẹo du lịch"]

export default function CamNangPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] md:h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/travel-guide-banner.jpg)` }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-background font-serif mb-4">Cẩm Nang Du Lịch</h1>
            <p className="text-xl text-background/90 max-w-2xl">
              Kinh nghiệm, mẹo hay và hướng dẫn chi tiết cho mọi chuyến đi
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-muted border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Tất cả" ? "default" : "outline"}
                  className={category === "Tất cả" ? "" : "bg-transparent"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Featured Article */}
            <article className="mb-12 bg-card rounded-3xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[300px] lg:h-auto">
                  <Image
                    src={articles[0].image || "/placeholder.svg"}
                    alt={articles[0].title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Nổi bật
                  </span>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-primary font-medium mb-2">{articles[0].category}</span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-card-foreground font-serif mb-4">
                    {articles[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{articles[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {articles[0].date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {articles[0].author}
                    </div>
                  </div>
                  <Button asChild className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href={`/cam-nang/${articles[0].id}`}>
                      Đọc thêm
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>

            {/* Other Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <article
                  key={article.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors font-serif">
                      <Link href={`/cam-nang/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">{article.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="bg-transparent">
                Xem thêm bài viết
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  )
}
