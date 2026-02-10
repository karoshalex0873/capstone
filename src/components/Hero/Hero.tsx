import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGraduationCap,
  FaUniversity,
  FaIdCard,
  FaBook,
  FaCalendar,
  FaArrowRight,
  FaUserCircle,
  FaChevronRight
} from 'react-icons/fa';
import { portfolioStats, studentInfo, heroStats, studentInfoItems } from '@/constants/projectData';

const Hero: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar - Compact */}
      <nav className="w-full py-4 px-6 border-b border-gray-200 shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">DeKUT Capstone</span>
          </div>
          <Link
            to="/project"
            className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            View Portfolio
            <FaChevronRight className="text-xs" />
          </Link>
        </div>
      </nav>

      {/* Main Content - Perfectly Centered, No Scroll */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto">
          {/* Grid Layout: 2 Columns on Desktop, 1 on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Column: Identity & Stats */}
            <div className="space-y-8">
              {/* Title & Tagline */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <FaGraduationCap className="text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700">Final Year Project</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {studentInfo.full_name}
                </h1>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {portfolioStats.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {heroStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  to="/project"
                  className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
                >
                  <span>Explore Full Portfolio</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Student Information Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 lg:p-8">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-50">
                  <FaUserCircle className="text-xl text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Student Profile</h2>
                  <p className="text-sm text-gray-600">Capstone Project Participant</p>
                </div>
              </div>

              {/* Information Grid */}
              <div className="space-y-4">
                {studentInfoItems.map((item, index) => {
                  let Icon;
                  switch (item.icon) {
                    case 'FaIdCard': Icon = FaIdCard; break;
                    case 'FaBook': Icon = FaBook; break;
                    case 'FaUniversity': Icon = FaUniversity; break;
                    case 'FaCalendar': Icon = FaCalendar; break;
                    default: Icon = FaIdCard;
                  }

                  return (
                    <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <Icon className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="font-medium text-gray-900">
                          {studentInfo[item.key]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Info Footer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Ready to explore the complete project?</p>
                  <Link
                    to="/project"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Browse all sections →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Indicator */}
          <div className="mt-8 lg:mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse"></div>
              <span>Scroll down on portfolio page for detailed content</span>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-3 px-6 border-t border-gray-200 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {studentInfo.institution}
          </p>
          <p className="text-xs text-gray-500">
            {studentInfo.course} • {studentInfo.year}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;