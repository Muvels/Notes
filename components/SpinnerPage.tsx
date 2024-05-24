"use client";
import Spinner from "@/components/Spinner";

const SpinnerPage = () => {
    return (
      <div className="fixed h-full inset-0 bg-background w-full z-50">
        <div className="h-full flex items-center justify-center">
            <Spinner size="lg" />
        </div>
      </div>
    );
};

export default SpinnerPage;
