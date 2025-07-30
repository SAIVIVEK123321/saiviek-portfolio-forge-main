import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchExperiences, saveExperiences } from '@/lib/api';

const API_BASE = 'https://saiviek-portfolio-forge-main.onrender.com';
const AUTH_TOKEN = 'mahi@123';

const ExperienceAdmin = () => {
  const queryClient = useQueryClient();
  const [experiences, setExperiences] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState(null);

  useEffect(() => {
    fetchExperiences().then(setExperiences);
  }, []);

  const updateExperience = (index, field, value) => {
    setExperiences(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const saveData = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');
    try {
      await saveExperiences(experiences, AUTH_TOKEN);
      setSuccess('Experiences saved successfully!');
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    setExperiences(prev => [
      ...prev,
      { title: '', company: '', location: '', startDate: '', endDate: '', description: '', image: '' }
    ]);
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingIndex(index);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error('Image upload failed');
      const data = await res.json();
      updateExperience(index, 'image', data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel - Experience</h1>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <input type="text" value={exp.title} onChange={e => updateExperience(index, 'title', e.target.value)} placeholder="Job Title" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            <input type="text" value={exp.company} onChange={e => updateExperience(index, 'company', e.target.value)} placeholder="Company" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            <input type="text" value={exp.location} onChange={e => updateExperience(index, 'location', e.target.value)} placeholder="Location" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            <input type="text" value={exp.startDate} onChange={e => updateExperience(index, 'startDate', e.target.value)} placeholder="Start Date" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            <input type="text" value={exp.endDate} onChange={e => updateExperience(index, 'endDate', e.target.value)} placeholder="End Date (or Present)" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            <div className="col-span-2 flex flex-col items-start">
              {exp.image && (
                <img src={`${API_BASE}${exp.image}`} alt="Experience" className="w-24 h-24 object-cover rounded-lg mb-2 border border-gray-300 dark:border-gray-700" />
              )}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="file" onChange={e => handleImageUpload(e, index)} className="sr-only" accept="image/*" />
                <span className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer">
                  {uploadingIndex === index ? 'Uploading...' : (exp.image ? 'Change Image' : 'Upload Image')}
                </span>
              </label>
            </div>
          </div>
          <textarea value={exp.description} onChange={e => updateExperience(index, 'description', e.target.value)} placeholder="Description" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2" rows={3} />
          <button
            type="button"
            onClick={() => setExperiences(prev => prev.filter((_, i) => i !== index))}
            className="absolute bottom-0 right-0 mb-2 mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
          >
            Delete
          </button>
        </div>
      ))}
      <div className="flex items-center space-x-4">
        <button onClick={addExperience} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">Add Experience</button>
        <button onClick={saveData} disabled={isSaving} className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50">{isSaving ? 'Saving...' : 'Save Experiences'}</button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default ExperienceAdmin; 