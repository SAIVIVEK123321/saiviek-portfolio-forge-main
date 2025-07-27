import React, { useState, useEffect } from 'react';
import { fetchAbout, saveAbout } from '@/lib/api';

const AUTH_TOKEN = 'mahi@123';

const emptyRole = { title: '', icon: '', description: '' };
const emptySkill = { category: '', items: [''] };
const emptyEducation = { degree: '', school: '', details: '' };

const AboutAdmin = () => {
  const [about, setAbout] = useState({
    intro: '',
    description: '',
    roles: [],
    skills: [],
    education: [],
    focusAreas: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAbout().then(data => {
      setAbout({
        intro: data?.intro || '',
        description: data?.description || '',
        roles: data?.roles || [],
        skills: data?.skills || [],
        education: data?.education || [],
        focusAreas: data?.focusAreas || [],
      });
    });
  }, []);

  const handleChange = (field, value) => {
    setAbout(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (idx, field, value) => {
    setAbout(prev => {
      const roles = [...prev.roles];
      roles[idx][field] = value;
      return { ...prev, roles };
    });
  };
  const addRole = () => setAbout(prev => ({ ...prev, roles: [...prev.roles, { ...emptyRole }] }));
  const deleteRole = idx => setAbout(prev => ({ ...prev, roles: prev.roles.filter((_, i) => i !== idx) }));

  const handleSkillChange = (idx, field, value) => {
    setAbout(prev => {
      const skills = [...prev.skills];
      if (field === 'items') skills[idx][field] = value.split(',').map(s => s.trim());
      else skills[idx][field] = value;
      return { ...prev, skills };
    });
  };
  const addSkill = () => setAbout(prev => ({ ...prev, skills: [...prev.skills, { ...emptySkill }] }));
  const deleteSkill = idx => setAbout(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));

  const handleEducationChange = (idx, field, value) => {
    setAbout(prev => {
      const education = [...prev.education];
      education[idx][field] = value;
      return { ...prev, education };
    });
  };
  const addEducation = () => setAbout(prev => ({ ...prev, education: [...prev.education, { ...emptyEducation }] }));
  const deleteEducation = idx => setAbout(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));

  const handleFocusAreaChange = (idx, value) => {
    setAbout(prev => {
      const focusAreas = [...prev.focusAreas];
      focusAreas[idx] = value;
      return { ...prev, focusAreas };
    });
  };
  const addFocusArea = () => setAbout(prev => ({ ...prev, focusAreas: [...prev.focusAreas, ''] }));
  const deleteFocusArea = idx => setAbout(prev => ({ ...prev, focusAreas: prev.focusAreas.filter((_, i) => i !== idx) }));

  const saveData = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');
    try {
      await saveAbout(about, AUTH_TOKEN);
      setSuccess('About Me saved successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel - About Me</h1>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Intro</label>
        <input type="text" value={about.intro} onChange={e => handleChange('intro', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2" />
        <label className="block font-semibold mb-2">Description</label>
        <textarea value={about.description} onChange={e => handleChange('description', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-2" rows={3} />
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block font-semibold">Roles</label>
          <button onClick={addRole} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Add Role</button>
        </div>
        {about.roles.map((role, idx) => (
          <div key={idx} className="mb-4 p-4 border rounded-lg relative">
            <input type="text" value={role.title} onChange={e => handleRoleChange(idx, 'title', e.target.value)} placeholder="Role Title" className="w-full mb-2 px-3 py-2 rounded border" />
            <input type="text" value={role.icon} onChange={e => handleRoleChange(idx, 'icon', e.target.value)} placeholder="Icon (e.g. Code, Briefcase)" className="w-full mb-2 px-3 py-2 rounded border" />
            <textarea value={role.description} onChange={e => handleRoleChange(idx, 'description', e.target.value)} placeholder="Role Description" className="w-full mb-2 px-3 py-2 rounded border" rows={2} />
            <button type="button" onClick={() => deleteRole(idx)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block font-semibold">Skills</label>
          <button onClick={addSkill} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Add Skill Category</button>
        </div>
        {about.skills.map((skill, idx) => (
          <div key={idx} className="mb-4 p-4 border rounded-lg relative">
            <input type="text" value={skill.category} onChange={e => handleSkillChange(idx, 'category', e.target.value)} placeholder="Category (e.g. Languages)" className="w-full mb-2 px-3 py-2 rounded border" />
            <input type="text" value={skill.items.join(', ')} onChange={e => handleSkillChange(idx, 'items', e.target.value)} placeholder="Items (comma separated)" className="w-full mb-2 px-3 py-2 rounded border" />
            <button type="button" onClick={() => deleteSkill(idx)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block font-semibold">Education</label>
          <button onClick={addEducation} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Add Education</button>
        </div>
        {about.education.map((edu, idx) => (
          <div key={idx} className="mb-4 p-4 border rounded-lg relative">
            <input type="text" value={edu.degree} onChange={e => handleEducationChange(idx, 'degree', e.target.value)} placeholder="Degree" className="w-full mb-2 px-3 py-2 rounded border" />
            <input type="text" value={edu.school} onChange={e => handleEducationChange(idx, 'school', e.target.value)} placeholder="School" className="w-full mb-2 px-3 py-2 rounded border" />
            <input type="text" value={edu.details} onChange={e => handleEducationChange(idx, 'details', e.target.value)} placeholder="Details (e.g. CGPA, Specialization)" className="w-full mb-2 px-3 py-2 rounded border" />
            <button type="button" onClick={() => deleteEducation(idx)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block font-semibold">Focus Areas</label>
          <button onClick={addFocusArea} className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">Add Focus Area</button>
        </div>
        {about.focusAreas.map((fa, idx) => (
          <div key={idx} className="mb-2 flex items-center relative">
            <input type="text" value={fa} onChange={e => handleFocusAreaChange(idx, e.target.value)} placeholder="Focus Area" className="w-full px-3 py-2 rounded border" />
            <button type="button" onClick={() => deleteFocusArea(idx)} className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
      <button onClick={saveData} disabled={isSaving} className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50">{isSaving ? 'Saving...' : 'Save About Me'}</button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default AboutAdmin; 