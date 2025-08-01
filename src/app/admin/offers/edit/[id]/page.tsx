'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Offer {
  id: number;
  title: string;
  description: string;
  bannerUrl: string;
  startsAt: string;
  endsAt: string;
}

export default function EditOfferPage() {
  const { id } = useParams();
  const router = useRouter();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOffer() {
      try {
        const res = await fetch(`/api/offers/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOffer(data);
        } else {
          alert('Failed to fetch offer');
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (id) fetchOffer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!offer) return;
    const { name, value } = e.target;
    setOffer({ ...offer, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer),
      });

      if (res.ok) {
        alert('Offer updated successfully!');
        router.push('/admin/offers');
      } else {
        alert('Failed to update offer');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!offer) return <p className="p-4">Loading offer details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Offer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={offer.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={offer.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="bannerUrl"
          value={offer.bannerUrl}
          onChange={handleChange}
          placeholder="Banner Image URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="startsAt"
          value={offer.startsAt.split('T')[0]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="endsAt"
          value={offer.endsAt.split('T')[0]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          {loading ? 'Updating...' : 'Update Offer'}
        </button>
      </form>
    </div>
  );
}
