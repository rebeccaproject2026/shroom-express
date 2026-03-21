import { useState } from 'react';

const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // null | 'success' | 'error'
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        // Simulate API call — replace with real endpoint when ready
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
            setEmail('');
            // setTimeout(() => setStatus(null), 4000);
        }, 1000);
    };

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Corporate Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-md bg-[#2A2A2A] text-white text-[14px] placeholder-[#FFFFFF] placeholder-font-light focus:outline-none focus:ring-1 focus:ring-[var(--store-primary)]"
                required
            />
            <button
                type="submit"
                disabled={loading || status === 'success'}
                className="w-full bg-[var(--store-primary)] text-white font-bold text-[14px] tracking-wider py-3.5 rounded-md uppercase hover:opacity-90 transition-opacity mb-3.5 disabled:opacity-60 cursor-pointer"
            >
                {loading ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
            </button>
            {status === 'success' && (
                <p className="text-green-400 text-xs font-medium -mt-2">
                    ✓ You're subscribed. Thanks for joining!
                </p>
            )}
            {status === 'error' && (
                <p className="text-red-400 text-xs font-medium -mt-2">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
};

export default NewsletterForm;
