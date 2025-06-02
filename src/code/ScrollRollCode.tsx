const ScrollRollCode = `

import { useState, useEffect } from 'react';

const ScrollRollAnimation = ({ 
    text = "This is the hidden text that reveals as the scroll unrolls from top to bottom, just like a real paper scroll would unfurl naturally!",
    duration = 3000,
    autoStart = false,
    triggerText = "Unroll Scroll"
}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        if (autoStart) {
            setTimeout(() => startAnimation(), 500);
        }
    }, [autoStart]);

    const startAnimation = () => {
        setIsAnimating(true);
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            setScrollHeight(easeOutCubic * 100);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    };

    const resetAnimation = () => {
        if (scrollHeight > 0) {
            const startHeight = scrollHeight;
            const startTime = Date.now();
            const animateRollUp = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / (duration * 0.7), 1);
                const easeInCubic = progress * progress * progress;
                const currentHeight = startHeight * (1 - easeInCubic);
                setScrollHeight(currentHeight);
                if (progress < 1) requestAnimationFrame(animateRollUp);
                else {
                    setIsAnimating(false);
                    setScrollHeight(0);
                }
            };
            requestAnimationFrame(animateRollUp);
        } else {
            setIsAnimating(false);
            setScrollHeight(0);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8">
            <div className="relative">
                <div className="relative w-96 bg-neutral-950 rounded-lg shadow-2xl overflow-hidden border border-white/10">
                    <div 
                        className="h-12 border-b border-white/10 relative bg-gradient-to-b from-neutral-700 to-neutral-900"
                        style={{ borderRadius: '8px 8px 0 0' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-20 h-2 bg-white/20 rounded-full shadow-inner"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-b from-black/30 to-transparent"></div>
                    </div>

                    <div className="relative bg-neutral-950">
                        <div 
                            className="bg-neutral-950 border-l border-r border-white/10 relative overflow-hidden"
                            style={{
                                height: \`\${scrollHeight * 4}px\`,
                                maxHeight: '400px',
                                transition: 'none'
                            }}
                        >
                            <div 
                                className={\`p-8 transition-all duration-1000 \${scrollHeight > 30 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}\`}
                            >
                                <p className="text-white leading-relaxed text-lg font-serif">
                                    {text}
                                </p>
                            </div>

                            <div 
                                className="absolute bottom-0 left-0 right-0 h-2"
                                style={{
                                    background: 'linear-gradient(180deg, transparent 0%, rgba(100,100,100,0.3) 50%, rgba(80,80,80,0.8) 100%)'
                                }}
                            ></div>
                        </div>

                        <div 
                            className="absolute left-0 right-0 bg-gradient-to-b from-white/10 to-transparent transition-all duration-300"
                            style={{
                                top: \`\${Math.max(48 + (scrollHeight * 4) - 8, 48)}px\`,
                                height: '12px',
                                opacity: scrollHeight > 5 ? 1 : 0
                            }}
                        ></div>
                    </div>

                    <div 
                        className={\`h-12 border-t border-white/10 relative transition-all duration-500 \${scrollHeight > 80 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}\`}
                        style={{
                            background: 'linear-gradient(0deg, #27272a 0%, #18181b 100%)',
                            borderRadius: '0 0 8px 8px',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-20 h-2 bg-white/20 rounded-full shadow-inner"></div>
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>

                <div 
                    className={\`absolute -left-3 bg-neutral-700 rounded-full shadow-lg transition-all duration-1000 \${scrollHeight > 10 ? 'w-6 h-6 -top-1' : 'w-4 h-4 top-1'}\`}
                ></div>
                <div 
                    className={\`absolute -right-3 bg-neutral-700 rounded-full shadow-lg transition-all duration-1000 \${scrollHeight > 10 ? 'w-6 h-6 -top-1' : 'w-4 h-4 top-1'}\`}
                ></div>

                <div 
                    className={\`absolute -left-3 bg-neutral-700 rounded-full shadow-lg transition-all duration-1000 \${scrollHeight > 80 ? 'w-6 h-6 opacity-100' : 'w-4 h-4 opacity-0'}\`}
                    style={{
                        bottom: scrollHeight > 80 ? '-4px' : '20px'
                    }}
                ></div>
                <div 
                    className={\`absolute -right-3 bg-neutral-700 rounded-full shadow-lg transition-all duration-1000 \${scrollHeight > 80 ? 'w-6 h-6 opacity-100' : 'w-4 h-4 opacity-0'}\`}
                    style={{
                        bottom: scrollHeight > 80 ? '-4px' : '20px'
                    }}
                ></div>
            </div>

            <div className="mt-8 flex gap-4">
                <button
                    onClick={startAnimation}
                    disabled={isAnimating && scrollHeight < 100}
                    className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 border border-white/20"
                >
                    {isAnimating && scrollHeight < 100 ? 'Unrolling...' : triggerText}
                </button>
                
                <button
                    onClick={resetAnimation}
                    className="px-8 py-3 bg-neutral-800 text-white font-semibold rounded-lg shadow-lg hover:bg-neutral-700 transition-all duration-300 transform hover:scale-105 border border-white/10"
                >
                    Roll Up
                </button>
            </div>

           
        </div>
    );
};

export default ScrollRollAnimation;

`

export default ScrollRollCode
