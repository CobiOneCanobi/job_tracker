/* eslint-disable no-console */
import { prisma } from '../src/lib/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Starting seed...');

  const DEMO_EMAIL = 'demo@example.com';

  // Check if demo user exists
  let demoUser = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  // If demo user exists, delete them and all related data (cascades automatically)
  if (demoUser) {
    console.log('Found existing demo user, removing old data...');
    await prisma.user.delete({
      where: { email: DEMO_EMAIL },
    });
    console.log('✓ Cleared existing demo user data');
  }

  // Hash password for demo user
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create fresh demo user
  demoUser = await prisma.user.create({
    data: {
      name: 'Elliot Alderson',
      email: DEMO_EMAIL,
      password: hashedPassword,
    },
  });

  console.log('✓ Created demo user: demo@example.com (password: password123)');

  // Create companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'Anthropic',
        website: 'https://anthropic.com',
        notes: 'AI safety and research company. Really interested in their mission!',
        userId: demoUser.id,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Stripe',
        website: 'https://stripe.com',
        notes: 'Payment infrastructure. Great engineering culture from what I hear.',
        userId: demoUser.id,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Vercel',
        website: 'https://vercel.com',
        notes: 'Frontend infrastructure. Love their products (Next.js, etc.)',
        userId: demoUser.id,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Linear',
        website: 'https://linear.app',
        notes: 'Issue tracking tool. Small team, high impact.',
        userId: demoUser.id,
      },
    }),
    prisma.company.create({
      data: {
        name: 'Notion',
        website: 'https://notion.so',
        notes: 'Productivity platform. Heard mixed things about work culture.',
        userId: demoUser.id,
      },
    }),
  ]);

  console.log(`✓ Created ${String(companies.length)} companies`);

  // Helper to get date relative to today
  const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const daysFromNow = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  // Create applications with realistic progression

  // 1. OFFER - Success story at Anthropic!
  await prisma.application.create({
    data: {
      positionTitle: 'Senior Full-Stack Engineer',
      jobUrl: 'https://anthropic.com/careers',
      status: 'OFFER',
      notes: 'Got the offer! $180k base + equity. Team seems amazing. Decision deadline: next Friday.',
      appliedDate: daysAgo(45),
      userId: demoUser.id,
      companyId: companies[0].id,
      interviews: {
        create: [
          {
            type: 'PHONE_SCREEN',
            scheduledAt: daysAgo(38),
            completedAt: daysAgo(38),
            notes: 'Talked with recruiter Sarah. Very positive conversation about the role.',
            feedback: 'Moving forward to technical interview!',
          },
          {
            type: 'TECHNICAL',
            scheduledAt: daysAgo(31),
            completedAt: daysAgo(31),
            notes: 'System design + coding. Built a rate limiter and discussed scaling strategies.',
            feedback: 'Strong technical performance. Team wants to move forward.',
          },
          {
            type: 'ONSITE',
            scheduledAt: daysAgo(24),
            completedAt: daysAgo(24),
            notes: '4 rounds: architecture, coding, behavioral, and team fit. Met the entire team.',
            feedback: 'Great cultural fit. Hiring manager loved my previous work on ML systems.',
          },
          {
            type: 'FINAL',
            scheduledAt: daysAgo(10),
            completedAt: daysAgo(10),
            notes: 'Chat with CTO about vision and growth opportunities.',
            feedback: 'Offer coming soon!',
          },
        ],
      },
      reminders: {
        create: [
          {
            title: 'Decision deadline',
            description: 'Need to accept or decline offer by Friday',
            remindAt: daysFromNow(3),
            status: 'PENDING',
            userId: demoUser.id,
          },
        ],
      },
    },
  });

  // 2. MID_PROCESS - Active at Stripe
  await prisma.application.create({
    data: {
      positionTitle: 'Backend Engineer - Payments Platform',
      jobUrl: 'https://stripe.com/jobs',
      status: 'MID_PROCESS',
      notes: 'In final rounds. Waiting to schedule last interview with the VP of Engineering.',
      appliedDate: daysAgo(35),
      userId: demoUser.id,
      companyId: companies[1].id,
      interviews: {
        create: [
          {
            type: 'PHONE_SCREEN',
            scheduledAt: daysAgo(28),
            completedAt: daysAgo(28),
            notes: 'Initial screening. Discussed my experience with distributed systems.',
            feedback: 'Passed! Moving to technical round.',
          },
          {
            type: 'TECHNICAL',
            scheduledAt: daysAgo(21),
            completedAt: daysAgo(21),
            notes: 'Live coding: implement idempotency for payment processing. Challenging but fun!',
            feedback: 'Did well. One more round with team lead.',
          },
          {
            type: 'BEHAVIOURAL',
            scheduledAt: daysAgo(14),
            completedAt: daysAgo(14),
            notes: 'Discussed past projects, conflict resolution, and team collaboration.',
            feedback: 'Strong answers. Final round next!',
          },
        ],
      },
      reminders: {
        create: [
          {
            title: 'Follow up on final interview',
            description: 'Check with recruiter about scheduling VP interview',
            remindAt: daysFromNow(2),
            status: 'PENDING',
            userId: demoUser.id,
          },
        ],
      },
    },
  });

  // 3. PHONE_SCREEN - Upcoming at Vercel
  await prisma.application.create({
    data: {
      positionTitle: 'Developer Experience Engineer',
      jobUrl: 'https://vercel.com/careers',
      status: 'PHONE_SCREEN',
      notes: 'Phone screen scheduled for next week. Need to review Next.js internals.',
      appliedDate: daysAgo(20),
      userId: demoUser.id,
      companyId: companies[2].id,
      interviews: {
        create: [
          {
            type: 'PHONE_SCREEN',
            scheduledAt: daysFromNow(5),
            notes: 'Initial call with hiring manager. Prepare questions about DX priorities.',
          },
        ],
      },
      reminders: {
        create: [
          {
            title: 'Prepare for Vercel phone screen',
            description: 'Review Next.js docs, prepare questions, test video setup',
            remindAt: daysFromNow(4),
            status: 'PENDING',
            userId: demoUser.id,
          },
        ],
      },
    },
  });

  // 4. APPLIED - Waiting at Linear
  await prisma.application.create({
    data: {
      positionTitle: 'Full-Stack Engineer',
      jobUrl: 'https://linear.app/careers',
      status: 'APPLIED',
      notes: 'Applied 2 weeks ago. Really want this one - small team, high impact.',
      appliedDate: daysAgo(14),
      userId: demoUser.id,
      companyId: companies[3].id,
      reminders: {
        create: [
          {
            title: 'Follow up on Linear application',
            description: 'Send a polite check-in email to recruiter',
            remindAt: daysFromNow(7),
            status: 'PENDING',
            userId: demoUser.id,
          },
        ],
      },
    },
  });

  // 5. REJECTED - Didn't work out at Notion
  await prisma.application.create({
    data: {
      positionTitle: 'Senior Frontend Engineer',
      jobUrl: 'https://notion.so/careers',
      status: 'REJECTED',
      notes: 'Got rejected after technical round. Feedback: looking for more React Native experience.',
      appliedDate: daysAgo(50),
      userId: demoUser.id,
      companyId: companies[4].id,
      interviews: {
        create: [
          {
            type: 'PHONE_SCREEN',
            scheduledAt: daysAgo(43),
            completedAt: daysAgo(43),
            notes: 'Initial screening went well.',
            feedback: 'Moving forward',
          },
          {
            type: 'TECHNICAL',
            scheduledAt: daysAgo(36),
            completedAt: daysAgo(36),
            notes: 'Coding challenge on component architecture. Felt okay but not amazing.',
            feedback: 'Unfortunately moving forward with other candidates.',
          },
        ],
      },
    },
  });

  // 6. SAVED - Researching opportunity
  await prisma.application.create({
    data: {
      positionTitle: 'Platform Engineer',
      jobUrl: 'https://example.com/job',
      status: 'SAVED',
      notes: 'Found this through referral. Seems interesting but want to research more before applying.',
      userId: demoUser.id,
      companyId: companies[1].id,
    },
  });

  // 7. WITHDRAWN - Changed mind
  await prisma.application.create({
    data: {
      positionTitle: 'Engineering Manager',
      jobUrl: 'https://example.com/mgr-role',
      status: 'WITHDRAWN',
      notes: 'Withdrew application - realized I want to stay in IC role for now.',
      appliedDate: daysAgo(60),
      userId: demoUser.id,
      companyId: companies[2].id,
    },
  });

  console.log('✓ Created 7 applications with realistic progression');
  console.log('✓ Created interviews and reminders');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📝 Demo account credentials:');
  console.log('   Email: demo@example.com');
  console.log('   Password: password123');
  console.log('\n💡 The demo shows a realistic 2-month job search journey:');
  console.log('   - 1 offer received (Anthropic)');
  console.log('   - 1 in final rounds (Stripe)');
  console.log('   - 1 phone screen scheduled (Vercel)');
  console.log('   - 1 waiting for response (Linear)');
  console.log('   - 1 rejected (Notion)');
  console.log('   - 2 inactive (saved/withdrawn)');
}

main()
  .catch((e: unknown) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
