"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface SupportStaff {
  name: string;
  phone: string;
  extension?: string;
}

interface CompanyInfo {
  address: string;
  hotline: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
  };
  socialLinks: {
    facebook: string;
    zalo: string;
  };
  supportStaff: SupportStaff[];
}

export default function CompanyInfoManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const { register, control, handleSubmit, reset, setValue } =
    useForm<CompanyInfo>({
      defaultValues: {
        address: "",
        hotline: "",
        email: "",
        workingHours: { weekdays: "", saturday: "" },
        socialLinks: { facebook: "", zalo: "" },
        supportStaff: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "supportStaff",
  });

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/company-info");
      const data = await res.json();
      if (data) {
        // Remove Payload system fields if present (id, createdAt, updatedAt, globalType)
        const { id, createdAt, updatedAt, globalType, ...cleanData } = data;
        reset(cleanData);
      }
    } catch (error) {
      console.error("Error fetching company info:", error);
      toast.error("Không thể tải thông tin công ty");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CompanyInfo) => {
    try {
      setIsSaving(true);
      const res = await fetch("/api/company-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");

      const result = await res.json();
      reset(result.result); // Update form with saved data
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.error("Error saving company info:", error);
      toast.error("Có lỗi xảy ra khi lưu thông tin");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quản lý Thông tin Công ty</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin chung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Địa chỉ</Label>
              <Input
                {...register("address")}
                placeholder="Số 1B, Ngô Quyền..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Hotline</Label>
                <Input {...register("hotline")} placeholder="024 39393539" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...register("email")} placeholder="info@suntravel.vn" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Giờ làm việc</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Thứ 2 - Thứ 6</Label>
              <Input
                {...register("workingHours.weekdays")}
                placeholder="8:00-18:00"
              />
            </div>
            <div className="space-y-2">
              <Label>Thứ 7</Label>
              <Input
                {...register("workingHours.saturday")}
                placeholder="8:00-12:00"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mạng xã hội</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input
                {...register("socialLinks.facebook")}
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label>Zalo URL</Label>
              <Input
                {...register("socialLinks.zalo")}
                placeholder="https://zalo.me/..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Nhân viên hỗ trợ</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "", phone: "", extension: "" })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm nhân viên
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border p-4 rounded-lg"
              >
                <div className="md:col-span-4 space-y-2">
                  <Label>Tên</Label>
                  <Input
                    {...register(`supportStaff.${index}.name`)}
                    placeholder="Ms. Nguyễn A"
                  />
                </div>
                <div className="md:col-span-4 space-y-2">
                  <Label>Số điện thoại</Label>
                  <Input
                    {...register(`supportStaff.${index}.phone`)}
                    placeholder="090..."
                  />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <Label>Máy lẻ</Label>
                  <Input
                    {...register(`supportStaff.${index}.extension`)}
                    placeholder="101"
                  />
                </div>
                <div className="md:col-span-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {fields.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                Chưa có nhân viên hỗ trợ nào
              </p>
            )}
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu thay đổi
        </Button>
      </form>
    </div>
  );
}
