import React from 'react'

const SectionTitle = ({ title, color }) => (
  <div className="mb-8">
    <h2 className="text-3xl font-bold mb-2">{title}</h2>
    <div className={`w-24 h-1 ${color}`}></div>
  </div>
)

export default SectionTitle