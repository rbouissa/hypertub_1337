import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  posted: string;    // ISO date string
  deadline: string;  // ISO date string
}

type FormJobPosting = Omit<JobPosting, 'id'>;

const RecruitmentManager: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [form, setForm] = useState<FormJobPosting>({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: [],
    responsibilities: [],
    benefits: [],
    posted: '',
    deadline: '',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const token = localStorage.getItem('accessToken');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/jobs/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMsg('Failed to fetch job postings.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (
    key: keyof FormJobPosting,
    value: string | string[]
  ) => {
    setForm({ ...form, [key]: value });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: '',
      department: '',
      location: '',
      type: '',
      salary: '',
      description: '',
      requirements: [],
      responsibilities: [],
      benefits: [],
      posted: '',
      deadline: '',
    });
    setErrorMsg(null);
  };

  const submitForm = async () => {
    try {
      // Prepare form data
      const payload = {
        ...form,
        requirements: form.requirements.filter(Boolean),
        responsibilities: form.responsibilities.filter(Boolean),
        benefits: form.benefits.filter(Boolean),
      };

      const url = editingId
        ? `http://localhost:8000/api/jobs/${editingId}/`
        : 'http://localhost:8000/api/jobs/';
      const method = editingId ? 'put' : 'post';

      const res = await axios({
        method,
        url,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (editingId) {
        setJobs(jobs.map(j => (j.id === editingId ? res.data : j)));
      } else {
        setJobs([...jobs, res.data]);
      }

      resetForm();
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        JSON.stringify(err?.response?.data) ||
        'Something went wrong. Please check your input.';
      setErrorMsg(message);
    }
  };

  const deleteJob = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/jobs/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter(j => j.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const startEdit = (job: JobPosting) => {
    setEditingId(job.id);
    setForm({ ...job });
    setErrorMsg(null);
  };

  // Helper to render multi-line array inputs as comma-separated textareas
  const renderArrayInput = (
    label: string,
    key: keyof FormJobPosting,
    values: string[]
  ) => (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-semibold text-text-primary dark:text-dark-text">{label} (comma separated)</label>
      <textarea
        value={values.join(', ')}
        onChange={e =>
          handleChange(
            key,
            e.target.value.split(',').map(s => s.trim())
          )
        }
        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-y"
        rows={3}
      />
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-background dark:bg-dark-bg px-6">
      <section className="text-center py-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-text-primary dark:text-dark-text"
        >
          Recruitment Management Panel
        </motion.h1>

        {errorMsg && (
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error: </strong>
              <span>{errorMsg}</span>
              <span
                onClick={() => setErrorMsg(null)}
                className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
              >
                <svg className="fill-current h-6 w-6 text-red-500" viewBox="0 0 20 20">
                  <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 101.414 1.414L10 9.828l2.934 2.934a1 1 0 001.414-1.414L11.414 8.586l2.934-2.934z" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </section>

      <section className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <input
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={e => handleChange('department', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={e => handleChange('location', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <input
            type="text"
            placeholder="Type (e.g. Full-time)"
            value={form.type}
            onChange={e => handleChange('type', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <input
            type="text"
            placeholder="Salary"
            value={form.salary}
            onChange={e => handleChange('salary', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-y"
            rows={3}
          />
          {renderArrayInput('Requirements', 'requirements', form.requirements)}
          {renderArrayInput('Responsibilities', 'responsibilities', form.responsibilities)}
          {renderArrayInput('Benefits', 'benefits', form.benefits)}
          <input
            type="date"
            placeholder="Posted Date"
            value={form.posted}
            onChange={e => handleChange('posted', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <input
            type="date"
            placeholder="Deadline"
            value={form.deadline}
            onChange={e => handleChange('deadline', e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg"
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={submitForm}
              className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              {editingId ? 'Update' : 'Create'} Job Posting
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Job Listings Grid */}
      <section className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group bg-white dark:bg-dark-surface rounded-2xl shadow-lg border dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 p-6"
          >
            <h3 className="text-xl font-bold mb-1 text-text-primary dark:text-dark-text">{job.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{job.department} - {job.location}</p>
            <p className="mb-2 font-semibold">{job.type} | Salary: {job.salary}</p>
            <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">{job.description}</p>

            <div className="mb-3">
              <strong>Requirements:</strong>
              <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Responsibilities:</strong>
              <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Benefits:</strong>
              <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                {job.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Posted: {new Date(job.posted).toLocaleDateString()} | Deadline: {new Date(job.deadline).toLocaleDateString()}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => startEdit(job)}
                className="flex-1 px-4 py-2 border text-blue-700 border-blue-500 rounded hover:bg-blue-50"
              >
                Edit
              </button>
              <button
                onClick={() => deleteJob(job.id)}
                className="flex-1 px-4 py-2 border text-red-600 border-red-500 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default RecruitmentManager;
