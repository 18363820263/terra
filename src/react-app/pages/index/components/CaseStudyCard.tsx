export default function CaseStudyCard({
  icon,
  title,
  description,
  metric1,
  metric1Label,
  metric2,
  metric2Label,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  metric1: string;
  metric1Label: string;
  metric2: string;
  metric2Label: string;
}) {
  return (
    <div className="flex min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[350px] flex-col items-center gap-6 p-6 sm:p-8 lg:p-10 rounded-2xl bg-white">
      <div className="w-16 h-16 flex items-center justify-center">
        <div>{icon}</div>
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="text-gray-950 text-nowrap text-2xl font-medium leading-9 text-center w-full">
            {title}
          </h3>
          <p className="text-gray-400 text-base font-light h-[70px] leading-6 line-clamp-3 text-center">
            {description}
          </p>
        </div>
        <div className="h-px w-full bg-gray-200" />
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col items-center gap-0.5 rounded-xl">
            <div className="flex items-center justify-center gap-0.5">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8.26779 0.11619L13.693 6.33298C13.736 6.38212 13.764 6.44262 13.7735 6.50724C13.7831 6.57185 13.7738 6.63785 13.7468 6.69732C13.7198 6.7568 13.6762 6.80724 13.6213 6.84259C13.5664 6.87795 13.5024 6.89674 13.4371 6.89669H10.7705C10.6885 6.89599 10.6092 6.92527 10.5473 6.97903C10.4855 7.03278 10.4454 7.1073 10.4347 7.18854C10.2348 8.6358 9.0274 15.0365 3.31034 15.984C3.23567 15.9984 3.15833 15.9874 3.09068 15.9526C3.02303 15.9179 2.96899 15.8614 2.93721 15.7924C2.90543 15.7233 2.89774 15.6455 2.91538 15.5715C2.93301 15.4976 2.97495 15.4316 3.03449 15.3843C4.01398 14.6167 5.29332 13.1295 5.65314 10.4828C5.79127 9.40767 5.85805 8.32452 5.85303 7.24052C5.85306 7.14964 5.81751 7.06236 5.754 6.99735C5.69049 6.93235 5.60406 6.89478 5.51321 6.89269H2.58272C2.5174 6.89274 2.45346 6.87395 2.39854 6.8386C2.34362 6.80324 2.30006 6.7528 2.27306 6.69333C2.24606 6.63385 2.23678 6.56785 2.24632 6.50324C2.25586 6.43862 2.28382 6.37812 2.32685 6.32899L7.75605 0.11619C7.78795 0.0796965 7.82728 0.0504481 7.87141 0.030408C7.91554 0.010368 7.96345 0 8.01192 0C8.06039 0 8.10829 0.010368 8.15243 0.030408C8.19656 0.0504481 8.23589 0.0796965 8.26779 0.11619Z"
                  fill="url(#paint0_linear_growth)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_growth"
                    x1="8.00992"
                    y1="0"
                    x2="8.00992"
                    y2="15.9902"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-blue-600 text-xl font-medium leading-[30px] text-center">
                {metric1}
              </span>
            </div>
            <span className="text-gray-400 text-base font-light leading-6 text-center">
              {metric1Label}
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5 rounded-xl">
            <div className="flex items-center justify-center gap-0.5">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8.26779 0.11619L13.693 6.33298C13.736 6.38212 13.764 6.44262 13.7735 6.50724C13.7831 6.57185 13.7738 6.63785 13.7468 6.69732C13.7198 6.7568 13.6762 6.80724 13.6213 6.84259C13.5664 6.87795 13.5024 6.89674 13.4371 6.89669H10.7705C10.6885 6.89599 10.6092 6.92527 10.5473 6.97903C10.4855 7.03278 10.4454 7.1073 10.4347 7.18854C10.2348 8.6358 9.0274 15.0365 3.31034 15.984C3.23567 15.9984 3.15833 15.9874 3.09068 15.9526C3.02303 15.9179 2.96899 15.8614 2.93721 15.7924C2.90543 15.7233 2.89774 15.6455 2.91538 15.5715C2.93301 15.4976 2.97495 15.4316 3.03449 15.3843C4.01398 14.6167 5.29332 13.1295 5.65314 10.4828C5.79127 9.40767 5.85805 8.32452 5.85303 7.24052C5.85306 7.14964 5.81751 7.06236 5.754 6.99735C5.69049 6.93235 5.60406 6.89478 5.51321 6.89269H2.58272C2.5174 6.89274 2.45346 6.87395 2.39854 6.8386C2.34362 6.80324 2.30006 6.7528 2.27306 6.69333C2.24606 6.63385 2.23678 6.56785 2.24632 6.50324C2.25586 6.43862 2.28382 6.37812 2.32685 6.32899L7.75605 0.11619C7.78795 0.0796965 7.82728 0.0504481 7.87141 0.030408C7.91554 0.010368 7.96345 0 8.01192 0C8.06039 0 8.10829 0.010368 8.15243 0.030408C8.19656 0.0504481 8.23589 0.0796965 8.26779 0.11619Z"
                  fill="url(#paint0_linear_growth2)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_growth2"
                    x1="8.00992"
                    y1="0"
                    x2="8.00992"
                    y2="15.9902"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-blue-600 text-xl font-medium leading-[30px] text-center">
                {metric2}
              </span>
            </div>
            <span className="text-gray-400 text-base font-light leading-6 text-center">
              {metric2Label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
