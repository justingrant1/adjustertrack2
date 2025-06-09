#!/usr/bin/env node

/**
 * SEO Analysis Script for AdjusterTrack
 * Run this script to check SEO health and get recommendations
 */

const fs = require('fs');
const path = require('path');

class SEOAnalyzer {
  constructor() {
    this.issues = [];
    this.recommendations = [];
    this.score = 100;
  }

  checkRobotsTxt() {
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      this.issues.push('❌ robots.txt file is missing');
      this.score -= 10;
    } else {
      console.log('✅ robots.txt file exists');
      const content = fs.readFileSync(robotsPath, 'utf-8');
      if (!content.includes('Sitemap:')) {
        this.issues.push('⚠️ robots.txt should include sitemap reference');
        this.score -= 5;
      }
    }
  }

  checkSitemap() {
    const sitemapXml = path.join(process.cwd(), 'public', 'sitemap.xml');
    const sitemapTs = path.join(process.cwd(), 'app', 'sitemap.ts');
    
    if (!fs.existsSync(sitemapXml) && !fs.existsSync(sitemapTs)) {
      this.issues.push('❌ No sitemap found (sitemap.xml or sitemap.ts)');
      this.score -= 15;
    } else {
      console.log('✅ Sitemap exists');
    }
  }

  checkManifest() {
    const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      this.issues.push('❌ manifest.json file is missing (affects PWA and SEO)');
      this.score -= 8;
    } else {
      console.log('✅ manifest.json file exists');
    }
  }

  checkMetaTags() {
    const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf-8');
      
      if (!content.includes('keywords:')) {
        this.issues.push('⚠️ Missing keywords meta tag in layout');
        this.score -= 5;
      }
      
      if (!content.includes('openGraph:')) {
        this.issues.push('❌ Missing OpenGraph meta tags');
        this.score -= 10;
      }
      
      if (!content.includes('twitter:')) {
        this.issues.push('❌ Missing Twitter meta tags');
        this.score -= 8;
      }
      
      if (!content.includes('application/ld+json')) {
        this.issues.push('❌ Missing structured data (JSON-LD)');
        this.score -= 15;
      } else {
        console.log('✅ Structured data found');
      }
    }
  }

  checkNextConfig() {
    const configPath = path.join(process.cwd(), 'next.config.js');
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, 'utf-8');
      
      if (!content.includes('compress: true')) {
        this.recommendations.push('💡 Enable compression in next.config.js');
      }
      
      if (!content.includes('headers()')) {
        this.recommendations.push('💡 Add security headers in next.config.js');
      }
      
      console.log('✅ next.config.js found and configured');
    } else {
      this.issues.push('⚠️ next.config.js not found - missing performance optimizations');
      this.score -= 5;
    }
  }

  checkPageMetadata() {
    const pagesPath = path.join(process.cwd(), 'app');
    const pageFiles = ['page.tsx'];
    
    pageFiles.forEach(file => {
      const fullPath = path.join(pagesPath, file);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (!content.includes('export const metadata')) {
          this.issues.push(`⚠️ ${file} missing page-specific metadata`);
          this.score -= 3;
        } else {
          console.log(`✅ ${file} has metadata`);
        }
      }
    });
  }

  checkImages() {
    const publicPath = path.join(process.cwd(), 'public');
    const requiredImages = [
      'favicon.ico',
      'apple-touch-icon.png',
      'favicon-32x32.png',
      'favicon-16x16.png'
    ];
    
    requiredImages.forEach(img => {
      if (!fs.existsSync(path.join(publicPath, img))) {
        this.issues.push(`⚠️ Missing ${img} for better SEO`);
        this.score -= 2;
      }
    });
  }

  generateRecommendations() {
    this.recommendations.push(
      '💡 Add Google Search Console verification',
      '💡 Add Bing Webmaster Tools verification',
      '💡 Create and submit XML sitemap to search engines',
      '💡 Optimize images with proper alt tags',
      '💡 Add breadcrumb structured data',
      '💡 Implement schema markup for reviews',
      '💡 Add FAQ structured data to relevant pages',
      '💡 Optimize page load speed (Core Web Vitals)',
      '💡 Create topic cluster content around insurance keywords',
      '💡 Add internal linking strategy',
      '💡 Monitor and improve TTFB (Time To First Byte)',
      '💡 Add hreflang tags if targeting multiple regions'
    );
  }

  generateReport() {
    console.log('\n🔍 SEO Analysis Report for AdjusterTrack');
    console.log('=' .repeat(50));
    
    this.checkRobotsTxt();
    this.checkSitemap();
    this.checkManifest();
    this.checkMetaTags();
    this.checkNextConfig();
    this.checkPageMetadata();
    this.checkImages();
    this.generateRecommendations();
    
    console.log(`\n📊 SEO Score: ${this.score}/100`);
    
    if (this.issues.length > 0) {
      console.log('\n❌ Issues Found:');
      this.issues.forEach(issue => console.log(issue));
    }
    
    if (this.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      this.recommendations.slice(0, 10).forEach(rec => console.log(rec));
    }
    
    console.log('\n🎯 Target Keywords:');
    console.log('- insurance adjuster license tracking');
    console.log('- adjuster license management software');
    console.log('- CE credit tracking');
    console.log('- license renewal reminders');
    console.log('- continuing education management');
    console.log('- multi-state license tracking');
    console.log('- adjuster compliance software');
    
    console.log('\n🔗 Next Steps:');
    console.log('1. Submit sitemap to Google Search Console');
    console.log('2. Submit sitemap to Bing Webmaster Tools');
    console.log('3. Monitor Core Web Vitals in PageSpeed Insights');
    console.log('4. Create content calendar for SEO blog posts');
    console.log('5. Build backlinks from insurance industry sites');
    
    if (this.score >= 90) {
      console.log('\n🎉 Excellent SEO setup! Your site is well-optimized.');
    } else if (this.score >= 75) {
      console.log('\n✅ Good SEO setup! Address the issues above for better rankings.');
    } else {
      console.log('\n⚠️ SEO needs improvement. Address critical issues first.');
    }
  }
}

// Run the analysis
const analyzer = new SEOAnalyzer();
analyzer.generateReport(); 