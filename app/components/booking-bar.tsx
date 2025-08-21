export default function BookingBar() {
  return (
    <div className="relative z-10 -mt-xl mb-xl translate-y-sm rounded-large bg-white-normal px-sm pb-sm pt-md shadow-raised min-h-[378px] lm:min-h-[252px] lm:translate-y-xl lm:p-md tb:mb-0 tb:mt-0 tb:min-h-[264px] tb:transform-none de:rounded-largest de:p-lg de:pt-sm de:min-h-[268px] ld:min-h-[160px] ld:pb-md">
      {/* SELECT */}
      <div className="mb-md flex items-center justify-between lm:mb-xxs tb:justify-start">
        <div className="flex items-center min-w-0 flex-auto lm:grow-0">
          <div className="min-w-0 grow [&>div]:w-full">
            <div className="relative inline-block">
              <div className="hidden tb:block">
                <button
                  type="button"
                  className="space-x-xs rtl:space-x-reverse h-form-box-normal text-normal bg-button-link-secondary-background hover:bg-button-link-secondary-background-hover active:bg-button-link-secondary-background-active focus:bg-button-link-secondary-background-focus text-button-link-secondary-foreground focus:text-button-link-secondary-foreground-focus active:text-button-link-secondary-foreground-active hover:text-button-link-secondary-foreground-hover ps-button-padding-md pe-button-padding-sm orbit-button-primitive font-base duration-fast group relative max-w-full items-center justify-center border-none text-center leading-none transition-all [&>*]:align-middle [&_.orbit-loading-spinner]:stroke-[currentColor] flex-none rounded-large tb:rounded-normal cursor-pointer hover:no-underline focus:no-underline active:no-underline flex font-medium"
                >
                  <div className="orbit-button-primitive-content inline-block [justify-content:var(--button-content-align)] text-start flex-1">
                    Aller-retour
                  </div>
                  <div className="orbit-button-primitive-icon flex items-center justify-center">
                    <svg
                      className="orbit-icon inline-block shrink-0 fill-current align-middle size-icon-medium"
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path d="M7.913 8.747a.904.904 0 0 0-1.275-.065.898.898 0 0 0-.066 1.27l4.796 5.303a.904.904 0 0 0 1.342-.003l4.72-5.255a.898.898 0 0 0-.07-1.271.904.904 0 0 0-1.274.07L12.39 12.91a.48.48 0 0 1-.713 0L7.913 8.748Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <div className="tb:hidden">
                <button
                  className="space-x-xs rtl:space-x-reverse h-form-box-small text-small bg-button-link-secondary-background hover:bg-button-link-secondary-background-hover active:bg-button-link-secondary-background-active focus:bg-button-link-secondary-background-focus text-button-link-secondary-foreground focus:text-button-link-secondary-foreground-focus active:text-button-link-secondary-foreground-active hover:text-button-link-secondary-foreground-hover ps-button-padding-sm pe-button-padding-xs orbit-button-primitive font-base duration-fast group relative max-w-full items-center justify-center border-none text-center leading-none transition-all [&>*]:align-middle [&_.orbit-loading-spinner]:stroke-[currentColor] flex-none rounded-large tb:rounded-normal cursor-pointer hover:no-underline focus:no-underline active:no-underline flex font-medium"
                  type="button"
                >
                  <div className="orbit-button-primitive-content inline-block [justify-content:var(--button-content-align)] text-start flex-1">
                    Aller-retour
                  </div>
                  <div className="orbit-button-primitive-icon flex items-center justify-center">
                    <svg
                      className="orbit-icon inline-block shrink-0 fill-current align-middle size-icon-medium"
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path d="M7.913 8.747a.904.904 0 0 0-1.275-.065.898.898 0 0 0-.066 1.27l4.796 5.303a.904.904 0 0 0 1.342-.003l4.72-5.255a.898.898 0 0 0-.07-1.271.904.904 0 0 0-1.274.07L12.39 12.91a.48.48 0 0 1-.713 0L7.913 8.748Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            <div className="relative inline-block">
              <div className="tb:hidden"></div>
              <div className="hidden tb:block"></div>
            </div>
          </div>

          <div></div>
        </div>
      </div>

      {/* SEARCH INPUTS */}
      <div></div>

      {/* FIND BOOKING.COM */}
      <div></div>
    </div>
  );
}
