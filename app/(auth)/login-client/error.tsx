'use client';

import ErrorCard from '@/components/errorcard';

export default function RegisterError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <ErrorCard errorMessage={error.message} reset={reset} />;
}