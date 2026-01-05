import { ChevronRight, Mail, Clock, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Banner2 } from "@/assets/imgs";
import { FormField, Clock24 } from "./components";
import { useLanguage } from "@/locales/LanguageContext";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { genSign } from "@/lib/utils";

// 定义表单数据类型
interface FormData {
  name: string;
  email: string;
  industry: string;
  companyName: string;
  phone: string;
  estimatedMonthlySales: string;
  businessDescription: string;
}
const SUBMIT_ENDPOINT = {
  'DEV': 'https://open.feishu.cn/open-apis/bot/v2/hook/11b2b7f3-9a09-43d4-8102-973f41a57114',
  // 'SECRET': 'Vj8sk8AEpLCfCgESXUXTkb',
  'SECRET': 'CFNFRSG8Lm4mBvraMnJk0g',
  'PROD': 'https://open.feishu.cn/open-apis/bot/v2/hook/1360ecef-f0ca-42b9-be11-07c3212eaa65'
};

export default function Cooperation() {
  const { t } = useLanguage();

  // 初始化表单
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      industry: '',
      companyName: '',
      phone: '',
      estimatedMonthlySales: '',
      businessDescription: ''
    }
  });

  // 表单提交处理函数
  const handleSubmit = async (data: FormData) => {
    try {
      // 构建提交的数据
      const submitData = {
        msg_type: "text",
        content: {
          text: JSON.stringify(data, null, 2)
        },
        sign: genSign(Date.now().toString(), 'Vj8sk8AEpLCfCgESXUXTkb')
      };

      // 发送请求
      const response = await fetch(SUBMIT_ENDPOINT.DEV, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      // 解析响应
      const result = await response.json();

      // 检查响应状态
      if (result.StatusCode === 0 && result.code === 0) {
        // 提交成功
        toast.success(t('success'));
        // 重置表单
        form.reset();
      } else {
        // 提交失败
        toast.error(t('error'));
      }
    } catch (error) {
      // 处理网络错误
      console.error('Form submission error:', error);
      toast.error(t('error'));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FloatingActions />

      <main className="flex flex-col items-center">
        {/* Hero Banner */}
        <section className="relative w-full h-[320px]">
          <img
            src={Banner2}
            alt="Cooperation background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4 md:px-8 lg:px-[120px] pt-[120px]">
            <div className="w-full max-w-[1200px] flex flex-col items-center gap-6">
              <h1 className="text-white text-3xl md:text-4xl lg:text-4xl font-medium leading-tight text-center">
                {t('getYourSolution')}
              </h1>
              <div className="h-px w-full bg-white/20" />
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-sm md:text-base font-light leading-6">
                    {t('responseTime')}
                  </span>
                </div>
                <div className="w-px h-4 bg-white/20 hidden md:block" />
                <div className="flex items-center gap-3">
                  <Clock24 />
                  <span className="text-white/70 text-sm md:text-base font-light leading-6">
                    {t('247Support')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full max-w-[1200px] px-4 md:px-8 lg:px-0 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            {/* Left Column - Quick Access & Contact Info */}
            <div className="w-full lg:w-[379px] flex-shrink-0 flex flex-col gap-10">
              {/* Quick Access */}
              <div className="flex flex-col gap-6">
                <h2 className="text-gray-950 text-2xl font-medium leading-9">
                  {t('quickAccess')}
                </h2>
                <div className="flex flex-col gap-4">
                  <button className="flex items-center justify-between h-12 px-5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-950 text-base font-normal leading-6">
                      {t('merchantOnboarding')}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-950" />
                  </button>
                  <button className="flex items-center justify-between h-12 px-5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-950 text-base font-normal leading-6">
                      {t('apiDocumentation')}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-950" />
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-6">
                <h2 className="text-gray-950 text-2xl font-medium leading-9">
                  {t('contactInformation')}
                </h2>
                <div className="flex flex-col gap-6">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-6 flex items-center">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-950/70 text-sm md:text-base font-light leading-6">
                        {t('businessEmail')}payoffice@starbit.net.cn
                      </p>
                      <p className="text-gray-950/70 text-sm md:text-base font-light leading-6">
                        {t('supportEmail')}support@starbit.net.cn
                      </p>
                    </div>
                  </div>

                  {/* 24/7 Support */}
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-6 flex items-center">
                      <Clock24 />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-950/70 text-sm md:text-base font-light leading-6">
                        {t('officialOrganization')}@starbit_Global
                      </p>
                      <p className="text-gray-950/70 text-sm md:text-base font-light leading-6">
                        {t('247Support')}
                      </p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-6 flex items-center">
                      <Zap className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-950/70 text-sm md:text-base font-light leading-6">
                        {t('responseTime')}
                      </p>
                      <p className="text-gray-950/70 text-sm md:text-base font-light leading-6">
                        {t('responseByManager')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-[604px] bg-gray-200" />

            {/* Right Column - Application Form */}
            <div className="flex-1 flex flex-col gap-6">
              <h2 className="text-gray-950 text-2xl font-medium leading-9">
                {t('applicationForm')}
              </h2>

              <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(handleSubmit)}>
                {/* Two Column Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="flex flex-col gap-8">
                    <FormField label={t('name')} placeholder={t('enterName')} type="text" name="name" form={form} />
                    <FormField
                      label={t('email')}
                      placeholder={t('enterEmail')}
                      type="email"
                      name="email"
                      form={form}
                    />
                    <FormField label={t('industry')} placeholder={t('enterIndustry')} type="text" name="industry" form={form} />
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-8">
                    <FormField label={t('companyName')} placeholder={t('enterCompanyName')} type="text" name="companyName" form={form} />
                    <FormField
                      label={t('phone')}
                      placeholder={t('enterPhone')}
                      type="tel"
                      name="phone"
                      form={form}
                    />
                    <FormField label={t('estimatedMonthlySales')} placeholder={t('enterMonthlySales')} type="text" name="estimatedMonthlySales" form={form} />
                  </div>
                </div>

                {/* Full Width Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-base font-light leading-6">
                    {t('businessDescription')}
                  </label>
                  <textarea
                    {...form.register('businessDescription')}
                    className={`w-full h-24 p-3 rounded-md border bg-white text-gray-950 text-base font-light leading-6 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none ${form.formState.errors.businessDescription ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder={t('enterBusinessDescription')}
                  />
                  {form.formState.errors.businessDescription && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.businessDescription?.message?.toString()}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex flex-col gap-2 max-w-[480px]">
                  <button
                    type="submit"
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <span className="text-white text-base font-normal leading-6">
                      {t('becomePartner')}
                    </span>
                  </button>
                  <p className="text-gray-400 text-xs font-light leading-[18px]">
                    {t('formHint')}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

