import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Phone,
  Mail,
  CheckCircle,
  Trophy,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

const teamDetails: Record<
  string,
  {
    title: string;
    location: string;
    duration: string;
    size: string;
    price: string;
    rating: number;
    reviews: number;
    badge?: string;
    description: string;
    goals: string[];
    activities: string[];
    included: string[];
  }
> = {
  "team-building-bien": {
    title: "Team Building Bãi Biển – Gắn Kết Đội Ngũ",
    location: "Đà Nẵng • Nha Trang • Phú Quốc",
    duration: "Nửa ngày - 1 ngày",
    size: "40 - 400 người",
    price: "Thiết kế theo quy mô đoàn",
    rating: 4.9,
    reviews: 65,
    badge: "Hot",
    description:
      "Chương trình team building năng động trên bãi biển tuyệt đẹp, kết hợp trò chơi vận động, gắn kết đội ngũ và tái tạo năng lượng trong không gian biển xanh cát trắng lý tưởng.",
    goals: [
      "Tăng cường sự gắn kết và tinh thần đồng đội",
      "Nâng cao kỹ năng giao tiếp & lãnh đạo",
      "Giải tỏa stress, tạo trải nghiệm đáng nhớ",
      "Khơi dậy năng lượng tích cực cho tập thể",
    ],
    activities: [
      "Chuỗi trò chơi vận động theo concept riêng (Beach Olympics)",
      "Cuộc đua tiếp sức, kéo co, xây thành lũy cát",
      "Treasure hunt & volleyball bãi biển",
      "Chụp flycam & clip recap highlight",
      "Gala dinner nhẹ bên lửa trại buổi tối",
    ],
    included: [
      "MC & facilitator chuyên nghiệp",
      "Đạo cụ trò chơi đầy đủ, âm thanh ánh sáng",
      "Nước uống, khăn lạnh suốt chương trình",
      "Bảo hiểm sự kiện & đội ngũ y tế sơ cứu",
      "Quà tặng & giải thưởng cho đội thắng",
      "Hỗ trợ 24/7 từ đội ngũ tổ chức",
    ],
  },
  "team-building-nui-rung": {
    title: "Team Building Núi Rừng & Camping",
    location: "Sapa • Đà Lạt • Pù Mát",
    duration: "2 ngày 1 đêm",
    size: "30 - 150 người",
    price: "Gói trọn gói, liên hệ tư vấn",
    rating: 4.8,
    reviews: 41,
    badge: "Adventure",
    description:
      "Hành trình khám phá thiên nhiên hùng vĩ kết hợp camping, trekking và các hoạt động rèn luyện ý chí, xây dựng tinh thần đồng đội mạnh mẽ giữa núi rừng Việt Nam.",
    goals: [
      "Rèn luyện sức bền & ý chí vượt thử thách",
      "Xây dựng lòng tin & tinh thần đồng đội",
      "Kết nối con người với thiên nhiên",
      "Tạo kỷ niệm gắn bó lâu dài",
    ],
    activities: [
      "Trekking nhẹ theo cung đường đẹp",
      "Dựng lều, đốt lửa trại & gala dinner ngoài trời",
      "Workshop kỹ năng sinh tồn & teamwork",
      "Orienteering & scavenger hunt trong rừng",
      "Teambreak chia sẻ & BBQ",
    ],
    included: [
      "Hướng dẫn viên địa phương & facilitator",
      "Thiết bị camping đầy đủ (lều, túi ngủ)",
      "Ăn uống trọn gói (BBQ, lửa trại)",
      "Xe đưa đón & phép trekking",
      "Bảo hiểm du lịch & y tế",
      "Hỗ trợ 24/7",
    ],
  },
  "indoor-outdoor": {
    title: "Indoor & Outdoor Kết Hợp – Đào Tạo & Trải Nghiệm",
    location: "Resort / Khách sạn 4-5 sao",
    duration: "1 ngày",
    size: "50 - 300 người",
    price: "Thiết kế theo mục tiêu chương trình",
    rating: 4.7,
    reviews: 29,
    description:
      "Chương trình linh hoạt kết hợp đào tạo indoor và trò chơi outdoor tại resort cao cấp, truyền tải thông điệp doanh nghiệp qua các hoạt động sôi động và ý nghĩa.",
    goals: [
      "Kết hợp đào tạo kỹ năng & vui chơi gắn kết",
      "Truyền thông KPI & giá trị cốt lõi doanh nghiệp",
      "Tạo không khí sôi động, năng lượng tích cực",
      "Củng cố văn hóa tổ chức",
    ],
    activities: [
      "Warm-up & ice-breaker indoor",
      "Chuỗi trò chơi outdoor theo nhóm (trust games, obstacle course)",
      "Workshop leadership/communication",
      "Photo scavenger hunt quanh resort",
      "Gala mini trao giải & vinh danh",
    ],
    included: [
      "Phòng hội trường & sân ngoài trời",
      "MC, facilitator & đạo cụ chuyên nghiệp",
      "Ăn trưa buffet tại resort",
      "Quà tặng & giải thưởng",
      "Bảo hiểm & hỗ trợ y tế",
      "Hỗ trợ 24/7",
    ],
  },
};

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = teamDetails[id];

  if (!data) {
    return (
      <>
        <Header />
        <section className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <div className="mx-auto mb-8 w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
              Chương trình không tồn tại
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto">
              Rất tiếc, chương trình team building bạn đang tìm không tồn tại
              hoặc đã kết thúc.
              <br /> Hãy khám phá các chương trình khác!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/mice/team-building">
                  <MapPin className="mr-2 h-5 w-5" /> Các chương trình Team
                  Building
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" /> Về trang chủ
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Chọn ảnh hero dựa trên id
  const heroImageUrl =
    id === "team-building-bien"
      ? "https://sungetawaystravel.com/wp-content/uploads/2024/03/dia_diem_to_chuc_team_building_da_nang_by_vietpower_dh0iwbw-fullview.jpg" // 15
      : id === "team-building-nui-rung"
      ? "https://localvietnam.com/wp-content/uploads/2021/05/trekking-pu-mat-national-park.jpg" // 6
      : "https://jackfruitadventure.com/wp-content/uploads/2025/12/JK_NETCOMPANY_2208-68-1200x800.jpg"; // 1

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[80vh] overflow-hidden">
        <Image
          src={heroImageUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-4xl">
          {data.badge && (
            <Badge className="mb-4 text-lg px-4 py-1">{data.badge}</Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 ">{data.title}</h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              {data.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              {data.duration}
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              {data.size}
            </div>
            {data.rating && (
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                {data.rating} ({data.reviews} đánh giá)
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nội dung chính */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left: Mô tả, Mục tiêu, Hoạt động */}
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 ">Mô tả chương trình</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.description}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8  flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-primary" />
                  Mục tiêu chương trình
                </h2>
                <ul className="space-y-4">
                  {data.goals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8  flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-primary" />
                  Hoạt động tiêu biểu
                </h2>
                <ol className="space-y-6">
                  {data.activities.map((act, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="font-bold text-primary text-lg">
                        {idx + 1}
                      </span>
                      <span className="text-muted-foreground">{act}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sidebar: Giá & Dịch vụ bao gồm */}
            <div className="bg-card p-8 rounded-2xl shadow-lg h-fit">
              <div className="mb-8">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {data.price}
                </p>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Dịch vụ bao gồm</h3>
              <ul className="space-y-4 mb-10">
                {data.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-4">
                <Button className="w-full text-lg" size="lg">
                  <Phone className="mr-2 h-5 w-5" /> Gọi ngay: 024 3939 3539
                </Button>
                <Button variant="outline" className="w-full text-lg" size="lg">
                  <Mail className="mr-2 h-5 w-5" /> Yêu cầu báo giá chi tiết
                </Button>
              </div>
            </div>
          </div>

          {/* Gallery hoạt động thực tế */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
              Hình ảnh hoạt động thực tế
            </h2>
            <div className="grid md:grid-cols-3 gap-8"></div>
          </div>

          {/* Gallery dịch vụ cao cấp (giống tour công tác) */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 ">
              Trải nghiệm dịch vụ chuyên nghiệp
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                  <h3 className="text-xl font-semibold">
                    Facilitator & MC chuyên nghiệp
                  </h3>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                  <h3 className="text-xl font-semibold">
                    Không gian resort cao cấp
                  </h3>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                  <h3 className="text-xl font-semibold">
                    Xe đưa đón riêng thoải mái
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
