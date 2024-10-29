import { useEffect, useRef } from 'react';

export const useHeroAnimation = () => {
    const animationRef = useRef(null);

    useEffect(() => {
        const element = animationRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return { animationRef };
};