import prisma from "../config/prisma.js";

// get statistics for admin dashboard
export async function getDashboardStats(req, res, next) {
  try {
    // 1. count total submissions in database
    const totalSubmissions = await prisma.formSubmission.count();

    // 2. group submissions by status (draft, in_review, submitted)
    const groups = await prisma.formSubmission.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    });

    // format the grouping results into a clean key-value object
    const stats = {
      draft: 0,
      in_review: 0,
      submitted: 0,
    };
    groups.forEach((g) => {
      stats[g.status] = g._count.id;
    });

    // 3. query last 5 submissions for the activity table
    const recentSubmissions = await prisma.formSubmission.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        formSchema: {
          select: {
            name: true,
          },
        },
      },
    });

    // send dashboard stats back to client
    res.json({
      totalSubmissions,
      stats,
      recentSubmissions,
    });
  } catch (err) {
    next(err);
  }
}
