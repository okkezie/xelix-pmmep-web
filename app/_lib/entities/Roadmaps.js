
const Roadmap = class {
    #title
    #periodType
    #period
    #startDate
    #endDate
    #mda
    #goals
    #financialRequirements
    #nonFinancialRequirements
    #foreseenChallenges
    #assumptions
    #proposedProjects
    #proposedInitiatives
    #dependencies
    #projectedImpacts
    #isDraft
    #approvalStatus;
    #approvalComment;
    #rejectionComment;
    #approvedBy;
    #rejectedBy;
    #approvedAt;
    #rejectedAt;

    constructor(roadmap) {
        if (typeof roadmap === 'string') {
            roadmap = JSON.parse(roadmap)
        }
        this.#dependencies = roadmap.dependencies
        this.#endDate = roadmap.endDate
        this.#startDate = roadmap.startDate
        this.#assumptions = roadmap.assumptions
        this.#financialRequirements = roadmap.financialRequirements
        this.#nonFinancialRequirements = roadmap.nonFinancialRequirements
        this.#foreseenChallenges = roadmap.foreseenChallenges
        this.#goals = roadmap.goals
        this.#isDraft = roadmap.isDraft
        this.#mda = roadmap.Roadmap
        this.#period = roadmap.period
        this.#periodType = roadmap.periodType
        this.#projectedImpacts = roadmap.projectedImpacts
        this.#proposedInitiatives = roadmap.proposedInitiatives
        this.#proposedProjects = roadmap.proposedProjects
        this.#title = roadmap.title
        this.#approvalStatus = roadmap.approvalStatus;
        this.#approvalComment = roadmap.approvalComment;
        this.#rejectionComment = roadmap.rejectionComment;
        this.#approvedBy = roadmap.approvedBy;
        this.#rejectedBy = roadmap.rejectedBy;
        this.#approvedAt = roadmap.approvedAt;
        this.#rejectedAt = roadmap.rejectedAt;
   }
    getApprovalStatus() {
        return this.#approvalStatus;
    }

    getApprovalComment() {
        return this.#approvalComment;
    }

    getRejectionComment() {
        return this.#rejectionComment;
    }

    getApprovedBy() {
        return this.#approvedBy;
    }

    getRejectedBy() {
        return this.#rejectedBy;
    }

    getApprovedAt() {
        return this.#approvedAt;
    }

    getRejectedAt() {
        return this.#rejectedAt;
    }

    getDependencies() {
        return this.#dependencies;
    }

    getEndDate() {
        return this.#endDate;
    }

    getStartDate() {
        return this.#startDate;
    }

    getAssumptions() {
        return this.#assumptions;
    }

    getFinancialRequirements() {
        return this.#financialRequirements;
    }

    getNonFinancialRequirements() {
        return this.#nonFinancialRequirements;
    }

    getForeseenChallenges() {
        return this.#foreseenChallenges;
    }

    getGoals() {
        return this.#goals;
    }

    getIsDraft() {
        return this.#isDraft;
    }

    getMda() {
        return this.#mda;
    }

    getPeriod() {
        return this.#period;
    }

    getPeriodType() {
        return this.#periodType;
    }

    getProjectedImpacts() {
        return this.#projectedImpacts;
    }

    getProposedInitiatives() {
        return this.#proposedInitiatives;
    }

    getProposedProjects() {
        return this.#proposedProjects;
    }

    getTitle() {
        return this.#title;
    }
}

export default Roadmap