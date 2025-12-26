"use client";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useCompanyInfo } from "@/hooks/use-company-info";

const formSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  message: z.string().min(5, "Nội dung phải có ít nhất 5 ký tự"),
  tourOfInterest: z.string().optional(),
  confirm_email: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const { data: companyInfo } = useCompanyInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Có lỗi xảy ra");
      }

      toast.success("Gửi yêu cầu thành công!");
      reset();
    } catch (error: any) {
      toast.error(
        error.message || "Gửi yêu cầu thất bại, vui lòng thử lại sau."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <p className="text-primary font-semibold mb-2">
              Liên hệ với chúng tôi
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground  mb-6">
              Suntravel Luôn Sẵn Sàng Hỗ Trợ Bạn
            </h2>
            <p className="text-muted-foreground mb-8">
              Hãy liên hệ với chúng tôi để được tư vấn miễn phí về các tour du
              lịch phù hợp nhất với nhu cầu của bạn.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Địa chỉ
                  </h4>
                  <p className="text-muted-foreground">{companyInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Hotline
                  </h4>
                  <p className="text-muted-foreground">{companyInfo.hotline}</p>
                  {companyInfo.supportStaff?.map((staff, index) => (
                    <p key={index} className="text-muted-foreground">
                      {staff.name}: {staff.phone}{" "}
                      {staff.extension ? `(Máy lẻ ${staff.extension})` : ""}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-muted-foreground">{companyInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Giờ làm việc
                  </h4>
                  <p className="text-muted-foreground">
                    Thứ 2 - Thứ 6: {companyInfo.workingHours?.weekdays}
                  </p>
                  <p className="text-muted-foreground">
                    Thứ 7: {companyInfo.workingHours?.saturday}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-card-foreground mb-6 ">
              Gửi yêu cầu tư vấn
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Họ và tên *"
                    className="h-12"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Số điện thoại *"
                    className="h-12"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Email"
                  type="email"
                  className="h-12"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Honeypot field (hidden) */}
              <input
                type="text"
                className="hidden"
                autoComplete="off"
                {...register("confirm_email")}
              />
              <div className="space-y-2">
                <Input
                  placeholder="Tour bạn quan tâm"
                  className="h-12"
                  {...register("tourOfInterest")}
                />
                {errors.tourOfInterest && (
                  <p className="text-sm text-destructive">
                    {errors.tourOfInterest.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Nội dung yêu cầu"
                  rows={4}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi yêu cầu"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
