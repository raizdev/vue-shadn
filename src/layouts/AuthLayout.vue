<template>
    <div class="flex h-screen">
        <div class="hidden lg:flex items-center justify-center flex-1 bg-gray-300 text-black">
            <div class="max-w-md text-center">
                <img src="https://seeklogo.com/images/C/corporate-company-logo-749CEE6ADC-seeklogo.com.png" />
            </div>
        </div>
        <div class="w-full lg:w-1/2 flex items-center justify-center">
            <div class="max-w-2xl w-full p-6">
                <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div style="padding: 20px 15px">
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
